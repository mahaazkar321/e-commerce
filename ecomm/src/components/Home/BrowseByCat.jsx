import React, { useState } from 'react';
import { FaMobileAlt, FaLaptop, FaHeadphones, FaCamera, FaGamepad, FaClock } from 'react-icons/fa';
const categories = [
  { name: 'Phones', icon: <FaMobileAlt /> },
  { name: 'Computers', icon: <FaLaptop /> },
  { name: 'SmartWatch', icon: <FaClock /> },
  { name: 'Camera', icon: <FaCamera /> },
  { name: 'HeadPhones', icon: <FaHeadphones /> },
  { name: 'Gaming', icon: <FaGamepad /> },
  { name: 'Tablets', icon: <FaMobileAlt /> },
  { name: 'Accessories', icon: <FaHeadphones /> }
];

const BrowseByCat = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 6; // Adjust based on your design needs

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + itemsPerPage >= categories.length ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? categories.length - itemsPerPage : prevIndex - 1
    );
  };

  const visibleCategories = categories.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <div style={styles.container}>
      <div className="best-selling-header">
        <div className="title-container">
          <p className="today-text">Categories</p>
          <h2 className="flash-title">Browse By Category</h2>
        </div>
        <div style={styles.arrows}>
          <button style={styles.arrowBtn} onClick={prevSlide}>←</button>
          <button style={styles.arrowBtn} onClick={nextSlide}>→</button>
        </div>
      </div>

      <div style={styles.grid}>
        {visibleCategories.map((cat, index) => (
          <div
            key={cat.name}
            style={{
              ...styles.card,
              ...(cat.name === 'Camera' ? styles.activeCard : {})
            }}
          >
            <div
              style={{
                ...styles.icon,
                color: cat.name === 'Camera' ? '#fff' : '#000'
              }}
            >
              {cat.icon}
            </div>
            <p style={{
              color: cat.name === 'Camera' ? '#fff' : '#000',
              fontWeight: '500',
              marginTop: '10px'
            }}>
              {cat.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px',
    overflow: 'hidden'
  },
  arrows: {
    display: 'flex',
    gap: '10px'
  },
  arrowBtn: {
    border: '1px solid #ccc',
    borderRadius: '50%',
    width: '35px',
    height: '35px',
    fontSize: '18px',
    cursor: 'pointer',
    background: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  
  activeCard: {
    backgroundColor: '#DB4444',
    borderColor: '#DB4444'
  },
  icon: {
    fontSize: '30px'
  },
  grid: {
    display: 'flex',
    gap: '20px',
    marginTop: '30px',
    transition: 'transform 0.3s ease',
    width:'120px',
    gap:'20px'
  },
  card: {
    minWidth: '120px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    padding: '25px 15px',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    flexShrink: 0,
    width:'190px'
  },

};

export default BrowseByCat;