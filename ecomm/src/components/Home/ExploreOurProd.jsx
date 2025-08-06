import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ExploreOurProd = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/all-products');
        setProducts(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading products...</div>;
  if (error) return <div style={{ color: 'red', textAlign: 'center', padding: '2rem' }}>Error: {error}</div>;

  return (
    <div id='explore' style={{
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{
        textAlign: 'center',
        marginBottom: '2rem',
        fontSize: '2rem',
        color: '#333'
      }}>Explore Our Products</h1>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem'
      }}>
        {products.map((product) => (
          <div key={product._id} style={{
            border: '1px solid #e1e1e1',
            borderRadius: '8px',
            overflow: 'hidden',
            transition: 'transform 0.3s ease',
            ':hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
            }
          }}>
            <div style={{
              position: 'relative',
              height: '250px',
              overflow: 'hidden',
              backgroundColor: '#f5f5f5'
            }}>
              <img 
                src={product.images && product.images[0] ? 
                  `http://localhost:5000${product.images[0]}` : 
                  'https://via.placeholder.com/300x400?text=Product+Image'} 
                alt={product.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x400?text=Product+Image';
                  e.target.style.objectFit = 'contain';
                }}
              />
              <div style={{
                position: 'absolute',
                top: '10px',
                left: '10px',
                backgroundColor: 'rgba(0,0,0,0.7)',
                color: 'white',
                padding: '5px 10px',
                borderRadius: '4px',
                fontSize: '0.9rem'
              }}>
                {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </div>
            </div>
            <div style={{ padding: '1rem' }}>
              <h3 style={{ 
                margin: '0 0 0.5rem 0',
                fontSize: '1.1rem'
              }}>
                {product.name}
              </h3>
              <p style={{ 
                fontWeight: 'bold',
                color: '#e63946',
                marginBottom: '1rem'
              }}>
                Rs. {product.price}
              </p>
              <button 
                onClick={() => navigate(`/products/all-products/${product._id}`)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  backgroundColor: '#333',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  ':hover': {
                    backgroundColor: '#555'
                  }
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

export default ExploreOurProd;