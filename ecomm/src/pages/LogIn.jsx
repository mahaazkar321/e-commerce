import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../assets/css/Navbar.css';
import { FaSearch, FaRegHeart, FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useCart } from "../context/CartContext";
import axios from 'axios';

import { useWishlist } from "../context/WishlistProvider"; // ✅ ADD THIS LINE
const LogIn = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const { setToken } = useCart();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const { fetchWishlistFromServer } = useWishlist(); // ✅ Add this

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post('http://localhost:5000/api/auth/login', formData);
    const authToken = res.data.token;

    alert(res.data.message);
    localStorage.setItem('token', authToken);
    setToken(authToken); // triggers cart fetch
    await fetchWishlistFromServer(authToken); // ✅ fetch saved wishlist
    navigate('/');
  } catch (err) {
    alert(err.response?.data?.message || 'Login failed');
  }
};


  return (
    <form onSubmit={handleSubmit} style={styles.container}>
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
    </form>
  );
};

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '400px',
    margin: '100px auto',
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
  },
};

export default LogIn;



