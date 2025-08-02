import React, { useRef, useState, useEffect } from "react";
import "../../assets/css/FlashSales.css";
import { FaRegHeart, FaHeart, FaStar, FaEye } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import axios from "axios";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistProvider";

const FlashSales = () => {
  const [products, setProducts] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);
  const sliderRef                 = useRef(null);

  const { addToCart }                   = useCart();
  const { wishlistItems, toggleWishlistItem } = useWishlist();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/flash-sales/featured"
        );
        const shuffled = data.sort(() => 0.5 - Math.random());
        setProducts(shuffled.slice(0, Math.floor(Math.random() * 2) + 4));
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const isWishlisted = (id) =>
    wishlistItems.some((i) => i._id === id || i.id === id);

  const slideBy = (offset) => {
    sliderRef.current?.scrollBy({ left: offset, behavior: "smooth" });
  };

  if (loading) return <div>Loading...</div>;
  if (error)   return <div>Error: {error}</div>;

  return (
    <div className="flash-sales-container">
      {/* Header */}
      <div className="flash-sales-header">
        <div className="title-container">
          <span style={{ backgroundColor: "#DB4444", width: 15, height: 30, borderRadius: 5 }}>
            <p className="today-text" style={{ marginLeft: 30, marginTop: 8 }}>
              Today's
            </p>
          </span>
          <br />
          <h2 className="flash-title">Flash Sales</h2>
        </div>
      </div>

      {/* Slider */}
      <div className="product-slider">
        <div className="slider-arrow left-arrow" onClick={() => slideBy(-250)}>
          <IoIosArrowBack />
        </div>

        <div className="products-container" ref={sliderRef}>
          {products.map((p) => {
            const displayPrice = p.DiscountedPrice ?? p.price ?? p.Actualprice ?? 0;
            const inWishlist    = isWishlisted(p._id);

            return (
              <div key={p._id} className="product-card">
                <div className="product-image-container">
                  <img
                    src={`http://localhost:5000${p.images[0]}`}
                    alt={p.name}
                    className="product-image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/300x400?text=No+Image";
                    }}
                  />

                  {/* Add to Cart */}
                  <button
                    className="add-to-cart"
                    onClick={() =>
                      addToCart(
                        { id: p._id, name: p.name, price: displayPrice, images: p.images },
                        1
                      )
                    }
                  >
                    Add To Cart
                  </button>

                  {/* Badges */}
                  <div className="product-badges">
                    <span className="discount-badge">{p.Discount}</span>

                    <div className="icon-group">
                      <button className="icon-button">
                        <FaEye className="view-icon" />
                      </button>
                      {/* Wishlist */}
                      <button
                        className="icon-button wishlist-button"
                        onClick={() => toggleWishlistItem({ ...p, category: "flash-sales" })}
                        title={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
                      >
                        {inWishlist ? (
                          <FaHeart className="wishlist-icon filled" />
                        ) : (
                          <FaRegHeart className="wishlist-icon" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="product-details">
                  <h3 className="product-name">{p.name}</h3>
                  <div className="price-container">
                    <span className="current-price">Rs. {displayPrice}</span>
                    <span className="old-price">Rs. {p.Actualprice}</span>
                  </div>
                  <div className="rating-container">
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={i < Math.floor(p.ratings) ? "star-filled" : "star-empty"}
                        />
                      ))}
                    </div>
                    <span className="rating-count">({p.ratings})</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="slider-arrow right-arrow" onClick={() => slideBy(250)}>
          <IoIosArrowForward />
        </div>
      </div>

      {/* View All */}
      <div className="views-all">
        <Link to="/flash-sales-all">
          <button className="views-all-btn">View All Products</button>
        </Link>
      </div>
    </div>
  );
};

export default FlashSales;
