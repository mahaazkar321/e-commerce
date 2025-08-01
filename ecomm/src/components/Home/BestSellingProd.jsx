import '../../assets/css/BestSellingProd.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useWishlist } from '../../context/WishlistProvider';

const BestSellingProd = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const { wishlistItems, toggleWishlistItem } = useWishlist();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:5000/api/best-selling');
        setProducts(res.data);
      } catch (err) {
        console.error('Error fetching best-selling products:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryName]);

  const isWishlisted = (productId) =>
  wishlistItems.some(
    (item) =>
      (item._id || item.id) === productId && item.category === 'best-selling'
  );

  if (loading) return <p style={{ textAlign: 'center' }}>Loading products...</p>;
  if (error) return <p style={{ color: 'red', textAlign: 'center' }}>Error: {error}</p>;
  if (products.length === 0) return <p style={{ textAlign: 'center' }}>No products found.</p>;

  const displayedProducts = categoryName === 'best-selling' ? products : products.slice(0, 4);

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      {!categoryName && (
        <div className="best-selling-header">
          <div className="title-container">
            <p className="today-text">This Month</p>
            <h2 className="flash-title">Best Selling Products</h2>
          </div>
          <div className="view-all-container">
            <Link to="/products/best-selling">
              <button className="view-all-btn">View All</button>
            </Link>
          </div>
        </div>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {displayedProducts.map((product) => (
          <div
            key={product._id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            }}
          >
            <div
              style={{
                position: 'relative',
                height: '250px',
                backgroundColor: '#f8f8f8',
              }}
            >
              <img
                src={
                  product.images?.[0]
                    ? `http://localhost:5000${product.images[0]}`
                    : 'https://via.placeholder.com/300x400?text=No+Image'
                }
                alt={product.name || 'Product image'}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x400?text=No+Image';
                  e.target.style.objectFit = 'contain';
                }}
              />

              <div
                style={{
                  position: 'absolute',
                  top: '10px',
                  left: '10px',
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  color: '#fff',
                  padding: '5px 10px',
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                }}
              >
                {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </div>

              <div
                onClick={() =>
                toggleWishlistItem({ ...product, category: 'best-selling' })
                  
                }
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  cursor: 'pointer',
                  zIndex: 2,
                }}
                title={
                  isWishlisted(product._id)
                    ? 'Remove from Wishlist'
                    : 'Add to Wishlist'
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                  fill={isWishlisted(product._id) ? '#DB4444' : 'none'}
                  stroke="#DB4444"
                  strokeWidth="2"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                    2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 
                    4.5 2.09C13.09 3.81 14.76 3 16.5 3 
                    19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 
                    11.54L12 21.35z" />
                </svg>
              </div>
            </div>

            <div style={{ padding: '1rem' }}>
              <h3 style={{ margin: '0 0 0.5rem' }}>{product.name}</h3>
              <p style={{ fontWeight: 'bold', color: '#e63946' }}>
                Rs. {product.price}
              </p>
              <button
                onClick={() =>
                  navigate(`/products/best-selling/${product._id}`)
                }
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  backgroundColor: '#333',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSellingProd;
