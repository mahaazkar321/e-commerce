import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './assets/css/style.css';
import { WishlistProvider } from './context/WishlistProvider';

<WishlistProvider>
  <App />
</WishlistProvider>

createRoot(document.getElementById('root')).render(
  <StrictMode>
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    <App />
=======
=======
>>>>>>> Stashed changes
    <WishlistProvider>
      <CartProvider>
    <App />
    </CartProvider></WishlistProvider>
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
  </StrictMode>
)