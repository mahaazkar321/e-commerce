import "../../assets/css/WishList.css";
import { FaTrash, FaStar } from "react-icons/fa";
import React from "react";
import { useWishlist } from "../../context/WishlistProvider";
import { useCart } from "../../context/CartContext"; // ✅ Import Cart Context
const Wishlist = () => {
  const { wishlistItems, removeWishlistItem } = useWishlist();
  const { addToCart } = useCart(); // ✅ Get addToCart function

  const getDisplayPrice = (product) =>
    product.DiscountedPrice ?? product.price ?? product.Actualprice ?? 0;

  return (
    <div className="flash-sales-container">
      <div className="best-selling-header">
        <div className="title-container">
          <p className="flash-title">Wishlist ({wishlistItems.length})</p>
        </div>
      </div>

      <div className="products-container">
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
                  <button
                    className="add-to-cart"
                    onClick={() => addToCart({ ...product, id: product.id || product._id }, 1)}
                  >
                    Add To Cart
                  </button>
                  <div className="product-badges">
                    {product.Discount && (
                      <span className="discount-badge">{product.Discount}</span>
                    )}
                    <div className="icon-group">
                      <button
                        className="icon-button"
                        onClick={() =>
                          removeWishlistItem(product._id, product.category)
                        }
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
      </div>
    </div>
  );
};

export default Wishlist;
