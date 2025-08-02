import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useWishlist } from '../context/WishlistProvider';

const FlashSalesAll = () => {
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
        const response = await axios.get(`http://localhost:5000/api/flash-sales`);

        const filtered = categoryName
          ? response.data.filter((product) => {
              const dbCategory = product.category?.toLowerCase().replace(/\s+/g, '-');
              return dbCategory === categoryName.toLowerCase();
            })
          : response.data;

        setProducts(filtered || []);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryName]);

  const isWishlisted = (product) =>
    wishlistItems?.some(
      (item) => item._id === product._id && item.category === categoryName
    );

  const getDisplayPrice = (product) =>
    product.DiscountedPrice ?? product.price ?? product.Actualprice ?? 0;

  if (loading) return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading products...</div>;
  if (error) return <div style={{ color: 'red', textAlign: 'center', padding: '2rem' }}>Error: {error}</div>;
  if (products.length === 0) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>No products found in "{categoryName}".</div>;
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem', textTransform: 'capitalize' }}>
        {categoryName ? categoryName.replace(/-/g, ' ') + ' Products' : 'All Flash Sale Products'}
      </h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {products.map((product) => {
          const withCategory = { ...product, category: categoryName };
          const imageUrl = product.images?.[0]
            ? `http://localhost:5000${product.images[0]}`
            : 'https://via.placeholder.com/300x400?text=No+Image';

          return (
            <div
              key={product._id}
              style={{
                border: '1px solid #e1e1e1',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
              }}
            >
              <div style={{ position: 'relative', height: '250px', backgroundColor: '#f5f5f5' }}>
                <img
                  src={imageUrl}
                  alt={product.name}
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
                    color: 'white',
                    padding: '5px 10px',
                    borderRadius: '4px',
                    fontSize: '0.85rem',
                  }}
                >
                  {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </div>

                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlistItem(withCategory);
                  }}
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    cursor: 'pointer',
                    fontSize: '1.5rem',
                    color: isWishlisted(product) ? 'red' : '#ccc',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    padding: '8px',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                    transition: 'color 0.3s ease',
                  }}
                  title={isWishlisted(product) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                >
                  {isWishlisted(product) ? <FaHeart /> : <FaRegHeart />}
                </div>
              </div>

              <div style={{ padding: '1rem' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{product.name}</h3>
                <p style={{ color: '#e63946', fontWeight: 'bold' }}>
                  Rs. {getDisplayPrice(product)}
                </p>
                <button
                  onClick={() =>
                  navigate(`/products/flash-sales/${product._id}`)
                }
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    backgroundColor: '#333',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  View Details
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FlashSalesAll;
