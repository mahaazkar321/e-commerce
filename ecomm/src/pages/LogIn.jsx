import React from 'react';

const LogIn = () => {
  return (
    <div style={styles.container}>
      <h2>Log In</h2>
      <input type="text" placeholder="Email or Phone Number" style={styles.input} />
      <input type="password" placeholder="Password" style={styles.input} />
      <button style={styles.loginBtn}>Log In</button>
    </div>
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
