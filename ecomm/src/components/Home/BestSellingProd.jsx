import React from 'react';
import { FaStar, FaRegStar, FaArrowRight } from 'react-icons/fa';
import '../../assets/css/BestSellingProd.css';
import speaker from '../../assets/img/Speaker.jpg'

const BestSellingProd = () => {
  const products = [
    {
      id: 1,
      name: "The north coat",
      currentPrice: "$260",
      oldPrice: "$360",
      rating: 68,
      stars: 5
    },
    {
      id: 2,
      name: "Gucci duffle bag",
      currentPrice: "$960",
      oldPrice: "$160",
      rating: 68,
      stars: 5
    },
    {
      id: 3,
      name: "RGB liquid CPU Cooler",
      currentPrice: "$160",
      oldPrice: "$170",
      rating: 68,
      stars: 5
    },
    {
      id: 4,
      name: "Small BookSelf",
      currentPrice: "$360",
      rating: 68,
      stars: 5
    }
  ];

  return (
    <>
    <div className="best-selling-container">
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
              marginTop: '8px',

            }}>This&nbsp;Month</p>
          </span>
          <br/>
          <h2 className="flash-title">Best Selling Products</h2>
        </div>
        <div className="view-all-container">
        <button className="view-all-btn">
          View All
        </button>
      </div>
      </div>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image-placeholder"></div>
            <div className="product-details">
              <h3 className="product-name">{product.name}</h3>
              <div className="price-container">
                <span className="current-price">{product.currentPrice}</span>
                {product.oldPrice && (
                  <span className="old-price">{product.oldPrice}</span>
                )}
              </div>
              <div className="rating-container">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <FaStar 
                      key={i} 
                      className="star-filled" 
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
    <div>
          <img src={speaker} alt='speaker' style={{width:'1350px' , height:'500px', marginRight:'50px', margin: '0 auto'}}/>
        </div>
        </>
  );
};

export default BestSellingProd;