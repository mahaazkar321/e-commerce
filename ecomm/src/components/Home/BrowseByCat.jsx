import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaFemale,
  FaMale,
  FaTv,
  FaCouch,
  FaBiking,
  FaBriefcaseMedical,
  FaHeartbeat,
} from 'react-icons/fa';

const categories = [
  { name: "Women's Fashion", path: '/category/woman-fashion', icon: <FaFemale /> },
  { name: 'Men Fashion', path: '/category/men-fashion', icon: <FaMale /> },
  { name: 'Electronics', path: '/category/appliance-electronics', icon: <FaTv /> },
  { name: 'Home & Lifestyle', path: '/category/home-and-lifestyle', icon: <FaCouch /> },
  { name: 'Sports & Outdoor', path: '/category/sports-and-outdoor', icon: <FaBiking /> },
  { name: 'Medicine', path: '/category/syrup-and-medicine', icon: <FaBriefcaseMedical /> },
  { name: 'Health and Beauty', path: '/category/health-and-beauty', icon: <FaHeartbeat /> },
];

const BrowseByCat = () => {
  const location = useLocation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const itemsPerPage = 6;

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
        {visibleCategories.map((cat) => {
          const isActive = location.pathname === cat.path;
          const isHovered = hoveredCategory === cat.name;

          const backgroundColor = isActive
            ? '#DB4444'
            : isHovered
            ? '#fbeaea'
            : '#fff';

          const borderColor = isActive
            ? '#DB4444'
            : isHovered
            ? '#DB4444'
            : '#ccc';

          const textColor = isActive ? '#fff' : '#000';

          const cardStyle = {
            ...styles.card,
            backgroundColor,
            borderColor,
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          };

          return (
            <Link
              to={cat.path}
              key={cat.name}
              style={{ ...cardStyle, textDecoration: 'none' }}
              onMouseEnter={() => setHoveredCategory(cat.name)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <div style={{ ...styles.icon, color: textColor }}>{cat.icon}</div>
              <p style={{ color: textColor, fontWeight: '500', marginTop: '10px' }}>
                {cat.name}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px',
    overflow: 'hidden',
  },
  arrows: {
    display: 'flex',
    gap: '10px',
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
    justifyContent: 'center',
  },
  icon: {
    fontSize: '30px',
  },
  grid: {
    display: 'flex',
    gap: '20px',
    marginTop: '30px',
    transition: 'transform 0.3s ease',
  },
  card: {
    minWidth: '120px',
    width: '190px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    padding: '25px 15px',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    flexShrink: 0,
  },
};

export default BrowseByCat;
