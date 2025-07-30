import "../../assets/css/WishList.css";
import { FaRegHeart, FaHeart, FaStar, FaEye, FaTrash } from "react-icons/fa";
import React, { useRef, useState, useEffect } from "react";

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

  const moveAllToBag = () => {
    // Implement your "Move All To Bag" functionality here
    console.log("Moving all items to bag");
  };

  const getDisplayPrice = (product) => {
    // Check if DiscountedPrice exists first, then fall back to price or Actualprice
    if (product.DiscountedPrice !== undefined) {
      return product.DiscountedPrice;
    } else if (product.price !== undefined) {
      return product.price;
    } else if (product.Actualprice !== undefined) {
      return product.Actualprice;
    }
    return 0; // Default value if no price is found
  };

  return (
    <div className="flash-sales-container">
      <div className="best-selling-header">
        <div className="title-container">
          <p className="flash-title">WishList({products.length})</p>
        </div>
        <div className="view-all-container">
          <button className="view-all-btn" onClick={moveAllToBag}>
            Move All To Bag
          </button>
        </div>
      </div>

      <div className="products-container">
        {products.length === 0 ? (
          <div className="empty-wishlist">
            <p>Your wishlist is empty</p>
          </div>
        ) : (
          products.map((product) => (
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
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/300x400?text=No+Image";
                  }}
                />
                <button className="add-to-cart">Add To Cart</button>
                <div className="product-badges">
                  {product.Discount && (
                    <span className="discount-badge">{product.Discount}</span>
                  )}
                  <div className="icon-group">
                    <button 
                      className="icon-button" 
                      onClick={() => removeFromWishlist(product._id)}
                      title="Remove from wishlist"
                    >
                      <FaTrash className="view-icon" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="product-details">
                <h3 className="product-name">{product.name}</h3>
                <div className="price-container">
                  <span className="current-price">Rs. {getDisplayPrice(product)}</span>
                  {product.Actualprice && product.DiscountedPrice && (
                    <span className="old-price">Rs. {product.Actualprice}</span>
                  )}
                </div>
                {product.ratings && (
                  <div className="rating-container">
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <FaStar 
                          key={i} 
                          className={i < Math.floor(product.ratings) ? "star-filled" : "star-empty"} 
                        />
                      ))}
                    </div>
                    <span className="rating-count">({product.ratings})</span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Wishlist;