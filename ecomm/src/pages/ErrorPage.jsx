import React from 'react';
import '../assets/css/ErrorPage.css'; // Make sure to create this CSS file

export default function ErrorPage() {
  return (
    <div className="error-container">
      <h1 className="error-title">404 Not Found</h1>
      <p className="error-message">Your visited page not found. You may go home page.</p>
      <button className="error-button" onClick={() => window.location.href = '/'}>
        Back to home page
      </button>
    </div>
  );
}
