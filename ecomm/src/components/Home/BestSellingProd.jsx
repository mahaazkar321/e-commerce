import '../../assets/css/BestSellingProd.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BestSellingProd = () => {
  const [products, setProducts] = useState([]);
  const [wishlistedProducts, setWishlistedProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { categoryName } = useParams();
  const navigate = useNavigate();

useEffect(() => {
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/best-selling');
      setProducts(response.data);

      // After fetching products, load wishlist
      const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
      const wishlistMap = {};
      wishlist.forEach(p => wishlistMap[p._id] = true);
      setWishlistedProducts(wishlistMap);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, [categoryName]);


const toggleWishlist = (productId) => {
  const product = products.find(p => p._id === productId);
  const existingWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

  const isAlreadyWishlisted = existingWishlist.some(p => p._id === productId);

  let updatedWishlist;
  if (isAlreadyWishlisted) {
    updatedWishlist = existingWishlist.filter(p => p._id !== productId);
  } else {
    updatedWishlist = [...existingWishlist, product];
  }

  localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));

  setWishlistedProducts((prev) => ({
    ...prev,
    [productId]: !prev[productId],
  }));
};


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
      {!categoryName && (
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
            <br />
            <h2 className="flash-title">Best Selling Products</h2>
          </div>
          <div className="view-all-container">
            <Link to="/products/best-selling" className="nav-item nav-link">
              <button className="view-all-btn">
                View All
              </button>
            </Link>
          </div>
        </div>
      )}

      {categoryName === 'best-selling' && (
        <div style={{ textAlign: 'center', margin: '2rem 0' }}>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#333'
          }}>Best Selling Products</h1>
        </div>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem'
      }}>
        {(categoryName === 'best-selling' ? products : products.slice(0, 4)).map((product) => {
          const isWishlisted = wishlistedProducts[product._id] || false;

          return (
            <div
              key={product._id}
              style={{
                border: '1px solid #e1e1e1',
                borderRadius: '8px',
                overflow: 'hidden',
                transition: 'transform 0.3s ease',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
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
                      ? `http://localhost:5000${product.images[0]}`
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

                {/* Stock Badge */}
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

                {/* Wishlist Icon */}
                <div
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    cursor: 'pointer',
                    zIndex: 2,
                    backgroundColor: 'transparent',
                    padding: '5px',
                    borderRadius: '100%',
                    transition: 'background 0.3s'
                  }}
                  title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  onClick={() => toggleWishlist(product._id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    viewBox="0 0 24 24"
                    width="20"
                    fill={isWishlisted ? '#DB4444' : 'none'}
                    stroke="#DB4444"
                    strokeWidth="2"
                  >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                             2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 
                             4.5 2.09C13.09 3.81 14.76 3 16.5 3 
                             19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 
                             11.54L12 21.35z" />
                  </svg>
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
                <button
                  onClick={() => navigate(`/products/best-selling/${product._id}`)}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    backgroundColor: '#333',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
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

export default BestSellingProd;


// import '../../assets/css/BestSellingProd.css';
// import { Link } from 'react-router-dom';
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';

// const BestSellingProd = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { categoryName } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get('http://localhost:5000/api/best-selling');
//         setProducts(response.data);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [categoryName]);

//   if (loading) {
//     return (
//       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
//         <p>Loading products...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div style={{ color: 'red', textAlign: 'center', padding: '2rem' }}>
//         Error: {error}
//       </div>
//     );
//   }

//   if (products.length === 0) {
//     return (
//       <div style={{ textAlign: 'center', padding: '2rem' }}>
//         No products found{categoryName ? ` in category "${categoryName}"` : ''}.
//       </div>
//     );
//   }

//   // Limit products to 3 only if not on "view all" page
//   const displayedProducts = categoryName === 'best-selling' ? products : products.slice(0, 3);

//   return (
//     <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
//       <div className="best-selling-header">
//         <div className="title-container">
//           <span style={{ backgroundColor: '#DB4444', width: '15px', height: '30px', borderRadius: '5px' }}>
//             <p className="today-text" style={{ marginLeft: '30px', marginTop: '8px' }}>
//               This&nbsp;Month
//             </p>
//           </span>
//           <br />
//           <h2 className="flash-title">Best Selling Products</h2>
//         </div>

//         {categoryName !== 'best-selling' && (
//           <div className="view-all-container">
//             <Link to="/products/best-selling" className="nav-item nav-link">
//               <button className="view-all-btn">View All</button>
//             </Link>
//           </div>
//         )}
//       </div>

//       <div
//         style={{
//           display: 'grid',
//           gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
//           gap: '1.5rem',
//         }}
//       >
//         {displayedProducts.map((product) => (
//           <div
//             key={product._id}
//             style={{
//               border: '1px solid #e1e1e1',
//               borderRadius: '8px',
//               overflow: 'hidden',
//               transition: 'transform 0.3s ease',
//               boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
//             }}
//           >
//             <div
//               style={{
//                 position: 'relative',
//                 height: '250px',
//                 overflow: 'hidden',
//                 backgroundColor: '#f5f5f5',
//               }}
//             >
//               <img
//                 src={
//                   product.images?.[0]
//                     ? `http://localhost:5000${product.images[0]}`
//                     : 'https://via.placeholder.com/300x400?text=No+Image'
//                 }
//                 alt={product.name}
//                 style={{
//                   width: '100%',
//                   height: '100%',
//                   objectFit: 'cover',
//                   display: 'block',
//                 }}
//                 onError={(e) => {
//                   e.target.src = 'https://via.placeholder.com/300x400?text=No+Image';
//                   e.target.style.objectFit = 'contain';
//                 }}
//               />
//               <div
//                 style={{
//                   position: 'absolute',
//                   top: '10px',
//                   left: '10px',
//                   backgroundColor: 'rgba(0,0,0,0.7)',
//                   color: 'white',
//                   padding: '5px 10px',
//                   borderRadius: '4px',
//                   fontSize: '0.9rem',
//                 }}
//               >
//                 {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
//               </div>
//             </div>
//             <div style={{ padding: '1rem' }}>
//               <h3
//                 style={{
//                   margin: '0 0 0.5rem 0',
//                   fontSize: '1.1rem',
//                   minHeight: '2.5rem',
//                 }}
//               >
//                 {product.name}
//               </h3>
//               <p
//                 style={{
//                   fontWeight: 'bold',
//                   color: '#e63946',
//                   marginBottom: '1rem',
//                 }}
//               >
//                 ${product.price}
//               </p>
//               <button
//                 onClick={() => navigate(`/products/best-selling/${product._id}`)}
//                 style={{
//                   width: '100%',
//                   padding: '0.5rem',
//                   backgroundColor: '#333',
//                   color: 'white',
//                   border: 'none',
//                   borderRadius: '4px',
//                   cursor: 'pointer',
//                 }}
//               >
//                 View Details
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BestSellingProd;
