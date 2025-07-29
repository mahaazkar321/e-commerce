
import "../../assets/css/WishList.css";
import { FaRegHeart, FaHeart, FaStar, FaEye, FaTrash } from "react-icons/fa";
import gamepad from "../../assets/img/gamepad.png";
import keyboard from "../../assets/img/keyboard.png";
import monitor from "../../assets/img/monitor.png";
import chair from "../../assets/img/chair.png";
import React, { useRef, useState, useEffect } from "react";

// ... your imports

const Wishlist = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setProducts(storedWishlist);
  }, []);

  const removeFromWishlist = (productId) => {
    const updated = products.filter(p => p._id !== productId);
    localStorage.setItem('wishlist', JSON.stringify(updated));
    setProducts(updated);
  };

  return (
    <div className="flash-sales-container">
      <div className="best-selling-header">
        <div className="title-container">
          <p className="flash-title">WishList({products.length})</p>
        </div>
        <div className="view-all-container">
          <button className="view-all-btn">Move All To Bag</button>
        </div>
      </div>

      <div className="products-container">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <div className="product-image-container">
              <img
                src={
                  product.images?.[0]
                    ? `http://localhost:5000${product.images[0]}`
                    : "https://via.placeholder.com/300x400?text=No+Image"
                }
                alt={product.name}
                className="product-image"
              />
              <button className="add-to-cart">Add To Cart</button>
              <div className="product-badges">
                <div className="icon-group">
                  <button className="icon-button" onClick={() => removeFromWishlist(product._id)}>
                    <FaTrash className="view-icon" />
                  </button>
                </div>
              </div>
            </div>
            <div className="product-details">
              <h3 className="product-name">{product.name}</h3>
              <div className="price-container">
                <span className="current-price">${product.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
