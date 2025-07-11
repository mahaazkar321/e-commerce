import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // ✅ import BrowserRouter
import App from './App.jsx';
import './assets/css/style.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/* ✅ wrap App with BrowserRouter */}
      <App />
    </BrowserRouter>
  </StrictMode>
);
