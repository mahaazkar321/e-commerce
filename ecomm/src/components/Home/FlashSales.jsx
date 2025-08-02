import React, { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FaRegHeart, FaHeart, FaStar, FaEye } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistProvider";
import "../../assets/css/FlashSales.css";
import "../../assets/css/BestSellingProd.css";

const FlashSales = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sliderRef = useRef(null);
  const location = useLocation();

  const { addToCart } = useCart();
  const { wishlistItems, toggleWishlistItem } = useWishlist();

  const isAllPage = location.pathname === "/products/flash-sales";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/flash-sales");
        const shuffled = data.sort(() => 0.5 - Math.random());
        setProducts(isAllPage ? data : shuffled.slice(0, Math.floor(Math.random() * 2) + 4));
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [isAllPage]);

  const isWishlisted = (id) =>
    wishlistItems.some((item) => item._id === id || item.id === id);

  const slideBy = (offset) => {
    sliderRef.current?.scrollBy({ left: offset, behavior: "smooth" });
  };

  const getDisplayPrice = (product) =>
    product.DiscountedPrice ?? product.price ?? product.Actualprice ?? 0;

  if (loading) return <div style={{ textAlign: "center", padding: "2rem" }}>Loading products...</div>;
  if (error) return <div style={{ color: "red", textAlign: "center", padding: "2rem" }}>Error: {error}</div>;

  return (
    <div className="flash-sales-container">
      {/* Header */}
      {!isAllPage && (
        <div className="flash-sales-header">
          <div className="title-container">
            <span style={{ backgroundColor: "#DB4444", width: 15, height: 30, borderRadius: 5 }}>
              <p className="today-text" style={{ marginLeft: 30, marginTop: 8 }}>This Month</p>
            </span>
            <br />
            <h2 className="flash-title">Flash Sales</h2>
          </div>
        </div>
      )}

      {/* Grid View for All Products Page */}
      {isAllPage ? (
        <>
          <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Flash Sales</h1>
          <div className="all-products-grid">
            {products.map((product) => (
              <div key={product._id} className="product-card">
                <div className="product-image-container">
                  <img
                    src={`http://localhost:5000${product.images[0]}`}
                    alt={product.name}
                    className="product-image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/300x400?text=No+Image";
                    }}
                  />
                  <div className="product-badges">
                    <span className="discount-badge">{product.Discount}</span>
                    <div className="icon-group">
                      <button className="icon-button"><FaEye className="view-icon" /></button>
                      <button
                        className="icon-button wishlist-button"
                        onClick={() => toggleWishlistItem({ ...product, category: "flash-sales" })}
                        title={isWishlisted(product._id) ? "Remove from wishlist" : "Add to wishlist"}
                      >
                        {isWishlisted(product._id) ? (
                          <FaHeart className="wishlist-icon filled" />
                        ) : (
                          <FaRegHeart className="wishlist-icon" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="product-details">
                  <h3 className="product-name">{product.name}</h3>
                  <div className="price-container">
                    <span className="current-price">Rs. {getDisplayPrice(product)}</span>
                    <span className="old-price">Rs. {product.Actualprice}</span>
                  </div>
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

                  {/* 👉 View Details button only in full-page view */}
                  <Link to={`/products/flash-sales/${product._id}`}>
                    <button className="view-details-btn">View Details</button>
                  </Link>

                
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          {/* Slider View */}
          <div className="product-slider">
            <div className="slider-arrow left-arrow" onClick={() => slideBy(-250)}>
              <IoIosArrowBack />
            </div>

            <div className="products-container" ref={sliderRef}>
              {products.map((product) => (
                <div key={product._id} className="product-card">
                  <div className="product-image-container">
                    <img
                      src={`http://localhost:5000${product.images[0]}`}
                      alt={product.name}
                      className="product-image"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/300x400?text=No+Image";
                      }}
                    />
                    <button
                      className="add-to-cart"
                      onClick={() =>
                        addToCart(
                          { id: product._id, name: product.name, price: getDisplayPrice(product), images: product.images },
                          1
                        )
                      }
                    >
                      Add To Cart
                    </button>
                    <div className="product-badges">
                      <span className="discount-badge">{product.Discount}</span>
                      <div className="icon-group">
                        <button className="icon-button"><FaEye className="view-icon" /></button>
                        <button
                          className="icon-button wishlist-button"
                          onClick={() => toggleWishlistItem({ ...product, category: "flash-sales" })}
                          title={isWishlisted(product._id) ? "Remove from wishlist" : "Add to wishlist"}
                        >
                          {isWishlisted(product._id) ? (
                            <FaHeart className="wishlist-icon filled" />
                          ) : (
                            <FaRegHeart className="wishlist-icon" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="product-details">
                    <h3 className="product-name">{product.name}</h3>
                    <div className="price-container">
                      <span className="current-price">Rs. {getDisplayPrice(product)}</span>
                      <span className="old-price">Rs. {product.Actualprice}</span>
                    </div>
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
                  </div>
                </div>
              ))}
            </div>

            <div className="slider-arrow right-arrow" onClick={() => slideBy(250)}>
              <IoIosArrowForward />
            </div>
          </div>

          {/* View All Button */}
          <div className="views-all">
            <Link to="/products/flash-sales">
              <button className="views-all-btn">View All Products</button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default FlashSales;
