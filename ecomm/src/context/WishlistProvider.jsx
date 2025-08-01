import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  const fetchWishlistFromServer = async (authToken) => {
    try {
      const res = await axios.get('http://localhost:5000/api/wishlist', {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setWishlistItems(res.data || []);
    } catch (err) {
      console.error('Failed to fetch wishlist:', err.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchWishlistFromServer(token);
    }
  }, []);

  const toggleWishlistItem = async (product) => {
    const authToken = localStorage.getItem('token');
    if (!authToken) return;

    const exists = wishlistItems.some(
      (item) => item._id === product._id && item.category === product.category
    );

    if (exists) {
      await removeWishlistItem(product._id, product.category);
    toast.error('Removed from Wishlist');
    } else {
      try {
        await axios.post(
          'http://localhost:5000/api/wishlist',
          {
            id: product._id,
            name: product.name,
            price: product.price,
            image: product.image,
            images: product.images,
            ratings: product.ratings,
            Discount: product.Discount,
            DiscountedPrice: product.DiscountedPrice,
            Actualprice: product.Actualprice,
            category: product.category,
          },
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
          
        );
           toast.success('Added to Wishlist');
      } catch (error) {
        console.error('Failed to add to wishlist:', error.message);
      }
    }

    // 🔄 Force sync after toggle
    await fetchWishlistFromServer(authToken);
  };

  const removeWishlistItem = async (productId, category) => {
    const authToken = localStorage.getItem("token");
    if (!authToken) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/wishlist/${productId}?category=${category}`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );

      setWishlistItems((prev) =>
        prev.filter(
          (item) =>
            item._id.toString() !== productId.toString() ||
            item.category !== category
        )
      );
      
    } catch (error) {
      console.error("Failed to remove item:", error.message);
    }
  };

  const clearWishlist = () => setWishlistItems([]);

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        toggleWishlistItem,
        removeWishlistItem,
        clearWishlist,
        fetchWishlistFromServer,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
