import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [hasFetchedCart, setHasFetchedCart] = useState(false);

  // Fetch cart from server when token changes
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);

    if (storedToken) {
      axios
        .get('http://localhost:5000/api/cart', {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((res) => {
          setCartItems(res.data);
          setHasFetchedCart(true); // Only sync after fetching from server
        })
        .catch(() => {
          setCartItems([]);
          setHasFetchedCart(true); // Still allow syncs if fetch failed
        });
    } else {
      setCartItems([]);
      setHasFetchedCart(false);
    }
  }, [token]);

  // Sync cart to backend after initial fetch
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken && hasFetchedCart) {
      axios.post(
        'http://localhost:5000/api/cart',
        { cartItems },
        { headers: { Authorization: `Bearer ${storedToken}` } }
      ).catch((err) => console.error("Failed to sync cart:", err));
    }
  }, [cartItems, hasFetchedCart]);

  const updateQuantity = (id, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: parseInt(quantity) } : item
      )
    );
  };

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const clearCart = () => {
    setCartItems([]);
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      axios.post(
        'http://localhost:5000/api/cart/clear',
        {},
        { headers: { Authorization: `Bearer ${storedToken}` } }
      ).catch((err) => console.error("Failed to clear server cart:", err));
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
        setToken, // Use in login/logout
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
