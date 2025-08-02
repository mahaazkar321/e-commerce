import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { CartProvider } from './context/CartContext.jsx';
import './assets/css/style.css';
import { WishlistProvider } from './context/WishlistProvider';
import { CartProvider } from './context/CartContext.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>

    <WishlistProvider>
      <CartProvider>
    <App />
    </CartProvider></WishlistProvider>


  </StrictMode>
)