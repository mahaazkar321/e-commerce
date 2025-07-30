// src/components/DetailsProduct/details.jsx
import React, { useState } from 'react';
import '../../assets/css/DetailsProduct.css';
import { useCart } from '../../context/CartContext';

const Details = ({ product }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const thumbnails = product.images?.slice(1) || [];

  return (
    <div className="product-container">
      <div className="product-images">
        <div className="thumbnail-list">
          {thumbnails.map((img, idx) => (
            <img
              key={idx}
              src={`http://localhost:5000${img}`}
              alt={`Thumbnail ${idx + 1}`}
              className="thumbnail"
            />
          ))}
        </div>
        <div className="main-image">
          <img
            src={
              product.images?.[0]
                ? `http://localhost:5000${product.images[0]}`
                : 'https://via.placeholder.com/300x400?text=No+Image'
            }
            alt="Main Product"
          />
        </div>
      </div>

      <div className="product-details">
        <h2 className="product-title">{product.name}</h2>
        <div className="product-rating">
          <span className="stars">★★★★☆</span>
          <span className="reviews">(150 Reviews)</span>
          <span className="in-stock">
            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>

        <div className="price">${product.price}</div>

        <p className="description">{product.description}</p>

        <div className="quantity-row">
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />
          <button
            className="buy-btn"
            onClick={() => addToCart(product, quantity)}
          >
            Add to Cart
          </button>
          <button className="wishlist-btn">♡</button>
        </div>

        <div className="delivery-info">
          <div className="delivery-row">
            <div className="icon">🚚</div>
            <div>
              <div className="title">Free Delivery</div>
              <a href="#">Enter your postal code for Delivery Availability</a>
            </div>
          </div>
          <div className="delivery-row">
            <div className="icon">↩️</div>
            <div>
              <div className="title">Return Delivery</div>
              <span>Free 30 Days Delivery Returns. <a href="#">Details</a></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
