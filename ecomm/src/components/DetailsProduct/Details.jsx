import React, { useState } from 'react';
import '../../assets/css/DetailsProduct.css';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistProvider';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

const Details = ({ product }) => {
  const { categoryName } = useParams();
  const { addToCart } = useCart();
  const { toggleWishlistItem, wishlistItems } = useWishlist();
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const thumbnails = product.images?.slice(1) || [];

  const normalizedCategory =
    categoryName || (product.category?.toLowerCase().replace(/\s+/g, '-') || '');

  const isInWishlist = wishlistItems.some(
    (item) => (item._id || item.id) === product._id && item.category === normalizedCategory
  );

  return (
    <div className="product-container">
      {/* ---------- Images Section ---------- */}
      <div className="product-images">
        <div className="thumbnail-list">
          {thumbnails.map((img, idx) => (
            <img
              key={idx}
              src={`http://localhost:5000${img}`}
              alt={`Thumbnail ${idx + 1}`}
              className="thumbnail"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/100x100?text=No+Image';
              }}
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
            alt={product.name}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x400?text=No+Image';
              e.target.style.objectFit = 'contain';
            }}
          />
        </div>
      </div>

      {/* ---------- Details Section ---------- */}
      <div className="product-details">
        <h2 className="product-title">{product.name}</h2>

        <div className="product-rating">
          <span className="stars">★★★★☆</span>
          <span className="reviews">(150 Reviews)</span>
          <span className="in-stock">
            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>

        <div className="price">Rs. {product.price}</div>

        <p className="description">{product.description}</p>

        {/* ---------- Quantity and Actions ---------- */}
        <div className="quantity-row">
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => {
              const val = Math.max(1, parseInt(e.target.value) || 1);
              setQuantity(val);
            }}
          />

          <button
            className="buy-btn"
            onClick={() => addToCart(product, quantity)}
            disabled={product.stock === 0}
          >
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>

          <button
            className={`wishlist-btn ${isInWishlist ? 'active' : ''}`}
            onClick={() =>
              toggleWishlistItem({ ...product, category: normalizedCategory })
            }
            title={isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            {isInWishlist ? <FaHeart color="red" /> : <FaRegHeart color="gray" />}
          </button>
        </div>

        {/* ---------- Delivery Info ---------- */}
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
              <span>
                Free 30 Days Delivery Returns. <a href="#">Details</a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
