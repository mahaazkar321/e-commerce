import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
  imageSection: {
    flex: 1,
    backgroundColor: '#e8f4f8',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '60%',
    maxWidth: '300px',
    objectFit: 'contain',
  },
  formSection: {
    flex: 1,
    padding: '3rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  input: {
    padding: '1rem',
    marginBottom: '1rem',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  createAccountBtn: {
    backgroundColor: '#DB4444',
    color: '#fff',
    padding: '1rem',
    border: 'none',
    borderRadius: '5px',
    fontWeight: 'bold',
    marginBottom: '1rem',
    cursor: 'pointer',
  },
  googleBtn: {
    padding: '1rem',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '1rem',
  },
  googleIcon: {
    width: '20px',
    height: '20px',
  },
  loginText: {
    fontSize: '0.9rem',
    textAlign: 'center',
  },
  loginLink: {
    color: '#007BFF',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', formData);
      alert(res.data.message);
      navigate('/log-in');
    } catch (err) {
      alert(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.imageSection}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/891/891419.png"
          alt="E-commerce"
          style={styles.image}
        />
      </div>

      <div style={styles.formSection}>
        <h2>Create an account</h2>
        <p>Enter your details below</p>

        <input
          type="text"
          name="name"
          placeholder="Name"
          style={styles.input}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          style={styles.input}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          style={styles.input}
          onChange={handleChange}
        />

        <button style={styles.createAccountBtn} onClick={handleSubmit}>
          Create Account
        </button>

        <button style={styles.googleBtn}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2972/2972431.png"
            alt="Google"
            style={styles.googleIcon}
          />
          Sign up with Google
        </button>

        <p style={styles.loginText}>
          Already have an account?{' '}
          <span onClick={() => navigate('/log-in')} style={styles.loginLink}>
            Log in
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
