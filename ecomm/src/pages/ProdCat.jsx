import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate  } from 'react-router-dom';

const ProdCat = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { categoryName } = useParams();
   const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/${categoryName}`);
        
        const filtered = categoryName
          ? response.data.filter((product) => {
            const dbCategory = product.category ? product.category.toLowerCase().replace(/\s+/g, '-') : '';
              const urlCategory = categoryName.toLowerCase();
              return dbCategory === urlCategory;
            })
          : response.data;
        
        setProducts(filtered);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryName]);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '200px'
      }}>
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        color: 'red', 
        textAlign: 'center', 
        padding: '2rem'
      }}>
        Error: {error}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '2rem'
      }}>
        No products found{categoryName ? ` in category "${categoryName}"` : ''}.
      </div>
    );
  }

  return (
    <div style={{
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
      }}>
        {categoryName ?` ${categoryName.replace(/-/g, ' ')} Products` : 'Explore Our Products'}
      </h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem'
      }}>
        {products.map((product) => (
          <div 
            key={product._id} 
            style={{
              border: '1px solid #e1e1e1',
              borderRadius: '8px',
              overflow: 'hidden',
              transition: 'transform 0.3s ease',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
              ':hover': {
                transform: 'translateY(-5px)'
              }
            }}
          >
            <div style={{
              position: 'relative',
              height: '250px',
              overflow: 'hidden',
              backgroundColor: '#f5f5f5'
            }}>
              <img
                src={
                  product.images?.[0] 
                    ? `http://localhost:5000${product.images[0]} `
                    : 'https://via.placeholder.com/300x400?text=No+Image'
                }
                alt={product.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x400?text=No+Image';
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
                fontSize: '1.1rem',
                minHeight: '2.5rem'
              }}>
                {product.name}
              </h3>
              <p style={{
                fontWeight: 'bold',
                color: '#e63946',
                marginBottom: '1rem'
              }}>
                ${product.price}
              </p>
              <button onClick={() => navigate(`/products/${categoryName}/${product._id}`)} style={{
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
              }}>
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProdCat;