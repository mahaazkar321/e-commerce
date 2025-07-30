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
