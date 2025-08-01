
import "../../assets/css/WishList.css";
<<<<<<< Updated upstream
import { FaRegHeart, FaHeart, FaStar, FaEye, FaTrash } from "react-icons/fa";
import gamepad from "../../assets/img/gamepad.png";
import keyboard from "../../assets/img/keyboard.png";
import monitor from "../../assets/img/monitor.png";
import chair from "../../assets/img/chair.png";
import React, { useRef, useState, useEffect } from "react";
=======
import { FaTrash, FaStar } from "react-icons/fa";
import React from "react";
import { useWishlist } from "../../context/WishlistProvider";
>>>>>>> Stashed changes

// ... your imports

const Wishlist = () => {
<<<<<<< Updated upstream
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setProducts(storedWishlist);
  }, []);

  const removeFromWishlist = (productId) => {
    const updated = products.filter(p => p._id !== productId);
    localStorage.setItem('wishlist', JSON.stringify(updated));
    setProducts(updated);
=======
  const { wishlistItems, removeWishlistItem } = useWishlist();

  const getDisplayPrice = (product) => {
    return product.DiscountedPrice ?? product.price ?? product.Actualprice ?? 0;
>>>>>>> Stashed changes
  };

  return (
    <div className="flash-sales-container">
      <div className="best-selling-header">
        <div className="title-container">
<<<<<<< Updated upstream
          <p className="flash-title">WishList({products.length})</p>
        </div>
        <div className="view-all-container">
          <button className="view-all-btn">Move All To Bag</button>
=======
          <p className="flash-title">Wishlist ({wishlistItems.length})</p>
>>>>>>> Stashed changes
        </div>
      </div>

      <div className="products-container">
<<<<<<< Updated upstream
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
=======
        {wishlistItems.length === 0 ? (
          <div className="empty-wishlist">
            <p>Your wishlist is empty</p>
          </div>
        ) : (
          wishlistItems.map((product) => {
            const imageUrl = product.images?.[0]?.startsWith("http")
              ? product.images[0]
              : `http://localhost:5000${product.images?.[0] || ""}`;

            return (
              <div key={product._id} className="product-card">
                <div className="product-image-container">
                  <img
                    src={imageUrl}
                    alt={product.name}
                    className="product-image"
                  />
                  <button className="add-to-cart">Add To Cart</button>
                  <div className="product-badges">
                    {product.Discount && (
                      <span className="discount-badge">{product.Discount}</span>
                    )}
                    <div className="icon-group">
                      <button
                        className="icon-button"
                       onClick={async () => {
  await removeWishlistItem(product._id, product.category);
  window.location.reload(); // 🔄 Force reload
}}

                      >
                        <FaTrash className="view-icon" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="product-details">
                  <h3 className="product-name">{product.name}</h3>
                  <div className="price-container">
                    <span className="current-price">
                      Rs. {getDisplayPrice(product)}
                    </span>
                    {product.Actualprice && product.DiscountedPrice && (
                      <span className="old-price">
                        Rs. {product.Actualprice}
                      </span>
                    )}
                  </div>

                  {product.ratings && (
                    <div className="rating-container">
                      <div className="stars">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={
                              i < Math.floor(product.ratings)
                                ? "star-filled"
                                : "star-empty"
                            }
                          />
                        ))}
                      </div>
                      <span className="rating-count">({product.ratings})</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
>>>>>>> Stashed changes
      </div>
    </div>
  );
};

export default Wishlist;
