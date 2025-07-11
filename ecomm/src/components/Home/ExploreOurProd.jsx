import React from 'react';

const ExploreOurProd = () => {
  // Using more reliable fashion image sources
  const products = [
    { id: 1, name: 'Classic White Shirt', price: '$39.99', imageUrl: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=300&h=400&fit=crop' },
    { id: 2, name: 'Slim Fit Jeans', price: '$59.99', imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=400&fit=crop' },
    { id: 3, name: 'Leather Jacket', price: '$129.99', imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=400&fit=crop' },
    { id: 4, name: 'Summer Dress', price: '$49.99', imageUrl: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=300&h=400&fit=crop' },
    { id: 5, name: 'Running Shoes', price: '$79.99', imageUrl: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=300&h=400&fit=crop' },
    { id: 6, name: 'Wool Sweater', price: '$69.99', imageUrl: 'https://images.unsplash.com/photo-1527719327859-c6ce80353573?w=300&h=400&fit=crop' },
    { id: 7, name: 'Formal Suit', price: '$199.99', imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop'},
    { id: 8, name: 'Casual T-shirt', price: '$24.99', imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop' }
  ];

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
      }}>Explore Our Products</h1>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem'
      }}>
        {products.map((product) => (
          <div key={product.id} style={{
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
              backgroundColor: '#f5f5f5' // Fallback background
            }}>
              <img 
                src={product.imageUrl} 
                alt={product.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block' // Ensures no extra space below image
                }}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x400?text=Product+Image';
                  e.target.style.objectFit = 'contain'; // Better for placeholder
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
                {product.id}
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
                {product.price}
              </p>
              <button style={{
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

export default ExploreOurProd;