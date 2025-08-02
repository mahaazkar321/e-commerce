import React, { useRef, useState, useEffect } from "react";
import "../../assets/css/FlashSales.css";
import { FaRegHeart, FaHeart, FaStar, FaEye } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link} from 'react-router-dom';
import axios from "axios";

const FlashSales = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wishlistedProducts, setWishlistedProducts] = useState({});
  const productsContainerRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/flash-sales/featured');
        // Get random 4-5 products
        const shuffled = response.data.sort(() => 0.5 - Math.random());
        const selectedProducts = shuffled.slice(0, Math.floor(Math.random() * 2) + 4);
        setProducts(selectedProducts);

        // Load wishlist from localStorage
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        const wishlistMap = {};
        wishlist.forEach(p => wishlistMap[p._id] = true);
        setWishlistedProducts(wishlistMap);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const toggleWishlist = (productId) => {
    const product = products.find(p => p._id === productId);
    const existingWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    const isAlreadyWishlisted = existingWishlist.some(p => p._id === productId);

    let updatedWishlist;
    if (isAlreadyWishlisted) {
      updatedWishlist = existingWishlist.filter(p => p._id !== productId);
    } else {
      updatedWishlist = [...existingWishlist, product];
    }

    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));

    setWishlistedProducts((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const scrollLeft = () => {
    if (productsContainerRef.current) {
      productsContainerRef.current.scrollBy({
        left: -250,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (productsContainerRef.current) {
      productsContainerRef.current.scrollBy({
        left: 250,
        behavior: 'smooth'
      });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flash-sales-container">
      <div className="flash-sales-header">
        <div className="title-container">
          <span style={{
            backgroundColor: '#DB4444', 
            width: '15px', 
            height: '30px', 
            borderRadius: '5px'
          }}>
            <p className="today-text" style={{
              marginLeft: '30px', 
              marginTop: '8px'
            }}>Today's</p>
          </span>
          <br/>
          <h2 className="flash-title">Flash Sales</h2>
        </div>
        <div className="countdown">
          <div className="countdown-item">
            <span>Days</span>
            <strong>03</strong>
          </div>
          <div className="countdown-separator">:</div>
          <div className="countdown-item">
            <span>Hours</span>
            <strong>23</strong>
          </div>
          <div className="countdown-separator">:</div>
          <div className="countdown-item">
            <span>Minutes</span>
            <strong>19</strong>
          </div>
          <div className="countdown-separator">:</div>
          <div className="countdown-item">
            <span>Seconds</span>
            <strong>56</strong>
          </div>
        </div>
      </div>

      <div className="product-slider">
        <div className="slider-arrow left-arrow" onClick={scrollLeft}>
          <IoIosArrowBack />
        </div>
        <div className="products-container" ref={productsContainerRef}>
          {products.map((product) => {
            const isWishlisted = wishlistedProducts[product._id] || false;
            
            return (
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
                  <button className="add-to-cart">Add To Cart</button>
                  <div className="product-badges">
                    <span className="discount-badge">{product.Discount}</span>
                    <div className="icon-group">
                      <button className="icon-button">
                        <FaEye className="view-icon" />
                      </button>
                      <button 
                        className="icon-button wishlist-button"
                        onClick={() => toggleWishlist(product._id)}
                        title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                      >
                        {isWishlisted ? (
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
                    <span className="current-price">Rs. {product.DiscountedPrice}</span>
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
            );
          })}
        </div>
        <div className="slider-arrow right-arrow" onClick={scrollRight}>
          <IoIosArrowForward />
        </div>
      </div>

      <div className="views-all">
        <Link to="/flash-sales-all">
                      <button className="views-all-btn">View All Products</button>
                    </Link>
        
      </div>
    </div>
  );
};

export default FlashSales;