import React, { useRef, useState } from "react";
import "../../assets/css/WishList.css";
import { FaEye, FaStar } from "react-icons/fa";
import gamepad from "../../assets/img/gamepad.png";
import keyboard from "../../assets/img/keyboard.png";
import monitor from "../../assets/img/monitor.png";
import chair from "../../assets/img/chair.png";

const JustForYou = () => {
  const products = [
    {
      id: 1,
      name: "HAVIT HV-982 Gamepad",
      price: "$120",
      oldPrice: "$160",
      discount: "-40%",
      rating: 89,
      image: gamepad,
    },
    {
      id: 2,
      name: "AK-900 Wired Keyboard",
      price: "$860",
      oldPrice: "$1500",
      discount: "-35%",
      rating: 79,
      image: keyboard,
    },
    {
      id: 3,
      name: "IPS LCD Gaming Monitor",
      price: "$370",
      oldPrice: "$400",
      discount: "-30%",
      rating: 99,
      image: monitor,
    },
    {
      id: 4,
      name: "3-Series Comfort Chair",
      price: "$375",
      oldPrice: "$400",
      discount: "-25%",
      rating: 45,
      image: chair,
    }
  ];

  const productsContainerRef = useRef(null);
  const [favorites, setFavorites] = useState({});

  const toggleFavorite = (productId) => {
    setFavorites(prev => ({
      ...prev,
      [productId]: !prev[productId]
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

  return (
    <div className="flash-sales-container">
         <div className="best-selling-header">
      <div className="title-container">
          <span style={{
            backgroundColor: '#DB4444', 
            width: '15px', 
            height: '30px', 
            borderRadius: '5px'
          }}>
            <p className="today-text" style={{
              marginLeft: '30px', 
              marginTop: '4px',

            }}>Just&nbsp;For&nbsp;You</p>
          </span>
          <br/>
        </div>
        <div className="view-all-container">
        <button className="view-all-btn">
          See All
        </button>
      </div>
      </div>
        <div className="products-container" ref={productsContainerRef}>
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image-container">
                <img src={product.image} alt={product.name} className="product-image" />
                <button className="add-to-cart">Add To Cart</button>
                <div className="product-badges">
                  <span className="discount-badge">{product.discount}</span>
                  <div className="icon-group">
                    <button className="icon-button">
                      <FaEye className="view-icon" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="product-details">
                <h3 className="product-name">{product.name}</h3>
                <div className="price-container">
                  <span className="current-price">{product.price}</span>
                  <span className="old-price">{product.oldPrice}</span>
                </div>
                <div className="rating-container">
                                  <div className="stars">
                                    {[...Array(5)].map((_, i) => (
                                      <FaStar 
                                        key={i} 
                                        className={i < 4 ? "star-filled" : "star-empty"} 
                                      />
                                    ))}
                                  </div>
                                  <span className="rating-count">({product.rating})</span>
                                </div>
              </div>
            </div>
          ))}
        </div>

     
    </div>
  );
};

export default JustForYou;