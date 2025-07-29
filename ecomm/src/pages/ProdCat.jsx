// pages/ProdCat.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

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

  if (loading) return <p>Loading products...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
  if (products.length === 0) return <p>No products found in this category.</p>;

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>{categoryName.replace(/-/g, ' ')} Products</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
        {products.map((product) => (
          <div key={product._id} style={{ border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden' }}>
            <img
              src={product.images?.[0] ? `http://localhost:5000${product.images[0]}` : 'https://via.placeholder.com/300x400?text=No+Image'}
              alt={product.name}
              style={{ width: '100%', height: '250px', objectFit: 'cover' }}
            />
            <div style={{ padding: '1rem' }}>
              <h3>{product.name}</h3>
              <p>${product.price}</p>
              <button onClick={() => navigate(`/products/${categoryName}/${product._id}`)}>View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProdCat;