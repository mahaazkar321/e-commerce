
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

// src/context/CartContext.jsx
import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, quantity = 1) => {
    const existingItem = cartItems.find(item => item.id === product._id);

    if (existingItem) {
      setCartItems(prev =>
        prev.map(item =>
          item.id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCartItems(prev => [
        ...prev,
        {
          id: product._id,
          name: product.name,
          price: product.price,
          quantity,
          image: product.images?.[0]
            ? `http://localhost:5000${product.images[0]}`
            : 'https://via.placeholder.com/300x400?text=No+Image'
        }
      ]);
    }
  };

  const updateQuantity = (id, newQty) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: parseInt(newQty) } : item
      )
    );
  };

  const value = {
    cartItems,
    addToCart,
    updateQuantity
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);

