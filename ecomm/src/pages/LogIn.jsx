import { useNavigate } from 'react-router-dom';
import '../assets/css/Navbar.css';
import { useState, useEffect } from 'react';
import { useWishlist } from "../context/WishlistProvider";
import axios from 'axios';
import { useCart } from '../context/CartContext';

const LogIn = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const { setToken, fetchCart } = useCart();
  const { fetchWishlistFromServer } = useWishlist();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      const authToken = res.data.token;
      const isAdmin = res.data.isAdmin;

      alert(res.data.message);

      // Save token in localStorage & state
      localStorage.setItem('token', authToken);
      localStorage.setItem('isAdmin', isAdmin);
      setToken(authToken);

      if (isAdmin) {
        // Redirect to admin panel
        navigate('/admin-panel');
      } else {
        // Fetch both cart and wishlist for regular users
        await fetchCart();                 
        await fetchWishlistFromServer(authToken); 
        navigate('/');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  // If already logged in, redirect
  useEffect(() => {
    const token = localStorage.getItem('token');
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    
    if (token) {
      if (isAdmin) {
        navigate('/admin-panel');
      } else {
        navigate('/');
      }
    }
  }, [navigate]);

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2>Log In</h2>
        <input
          name="email"
          value={formData.email}
          placeholder="Email"
          style={styles.input}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          placeholder="Password"
          style={styles.input}
          onChange={handleChange}
          required
        />
        <button type="submit" style={styles.loginBtn}>Log In</button>
        
        {/* Admin login hint (optional - remove in production) */}
        <div style={styles.adminHint}>
          <p>Admin access: admin@example.com / admin123</p>
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
  },
  form: {
    padding: '2rem',
    width: '100%',
    maxWidth: '400px',
    backgroundColor: 'white',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    border: '1px solid #ccc',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)'
  },
  input: {
    display: 'block',
    width: '100%',
    padding: '1rem',
    margin: '1rem 0',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  loginBtn: {
    backgroundColor: '#DB4444',
    color: '#fff',
    padding: '1rem 2rem',
    border: 'none',
    borderRadius: '5px',
    fontWeight: 'bold',
    cursor: 'pointer',
    width: '100%',
    marginTop: '1rem',
  },
  adminHint: {
    marginTop: '1.5rem',
    padding: '1rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '5px',
    fontSize: '0.8rem',
    color: '#6c757d',
  },
};

export default LogIn;