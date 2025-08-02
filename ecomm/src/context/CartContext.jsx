import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [hasFetchedCart, setHasFetchedCart] = useState(false);

  // 🔁 Fetch cart from backend
  const fetchCart = async () => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) return;

    try {
      const res = await axios.get('http://localhost:5000/api/cart', {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      setCartItems(res.data || []);
      setHasFetchedCart(true);
    } catch (err) {
      console.error("Fetch cart failed:", err.message);
      setCartItems([]);
      setHasFetchedCart(true);
    }
  };

  // 🔁 Fetch cart when component mounts or token changes
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);

    if (storedToken) {
      fetchCart();
    } else {
      setCartItems([]);
      setHasFetchedCart(false);
    }
  }, [token]);

  // 🔁 Sync cart to backend when cartItems changes
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken && hasFetchedCart) {
      axios
        .post(
          'http://localhost:5000/api/cart',
          { cartItems },
          { headers: { Authorization: `Bearer ${storedToken}` } }
        )
        .catch((err) => console.error("Failed to sync cart:", err));
    }
  }, [cartItems, hasFetchedCart]);

  // ✅ Update quantity of specific item
  const updateQuantity = (id, quantity) => {
    const updated = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: parseInt(quantity) } : item
    );
    setCartItems(updated);
  };

  // ✅ Add item to cart
  const addToCart = (product, qty = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      let updated;

      if (existing) {
        updated = prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
          toast.success('updated to Cart');
      } else {
        updated = [...prev, { ...product, quantity: qty }];
          toast.success('Added to Cart');
      }

      // ✅ Manual sync immediately after update
      const storedToken = localStorage.getItem('token');
      // if (storedToken && hasFetchedCart) {
      //   axios
      //     .post(
      //       'http://localhost:5000/api/cart',
      //       { cartItems: updated },
      //       { headers: { Authorization: `Bearer ${storedToken}` } }
      //     )
      //     .catch((err) => console.error("Failed to sync cart:", err));
      // }

      return updated;
    });
  };

  // ✅ Clear entire cart
  const clearCart = () => {
    setCartItems([]);
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      axios
        .delete('http://localhost:5000/api/cart', {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .catch((err) => console.error("Failed to clear server cart:", err));
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        updateQuantity,
        clearCart,
        setToken,
        fetchCart, // 🆕 You can call this after login
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
