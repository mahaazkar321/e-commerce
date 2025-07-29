import React from 'react';
import '../../assets/css/DetailsProduct.css';

const Details = ({ product }) => {
  if (!product) return null;

  const thumbnails = product.images?.slice(1) || [];

  return (
    <div className="product-container">
      {/* Left: Images */}
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

      {/* Right: Details */}
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

        <div className="colors">
          <span>Colours:</span>
          <div className="color-options">
            <span className="color red" />
            <span className="color gray" />
          </div>
        </div>

        <div className="sizes">
          <span>Size:</span>
          <div className="size-options">
            {['XS', 'S', 'M', 'L', 'XL'].map((size, i) => (
              <button key={i} className={`size-btn ${size === 'M' ? 'selected' : ''}`}>{size}</button>
            ))}
          </div>
        </div>

        <div className="quantity-row">
          <input type="number" defaultValue={1} min={1} />
          <button className="buy-btn">Buy Now</button>
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
