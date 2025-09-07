import React, { useState } from 'react';
import axios from 'axios';
import { getCategoryEndpoint } from '../../../../backend/utils/categoryMapper';
import '../../assets/css/AddProd.css';

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Men Fashion',
    stock: '',
    ratings: '',
    isFeatured: false
  });
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [message, setMessage] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    'Men Fashion',
    'Woman Fashion',
    'Sports',
    'Syrup and Medicine',
    'Electronics',
    'Home and Lifestyle',
    'Health and Beauty',
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct({
      ...product,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    // Create preview URLs
    const previews = files.map(file => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  const resetForm = () => {
    setProduct({
      name: '',
      description: '',
      price: '',
      category: 'Men Fashion',
      stock: '',
      ratings: '',
      isFeatured: false
    });
    setImages([]);
    setPreviewImages([]);
    setMessage('');
    setShowSuccessPopup(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const formData = new FormData();
      // Append product data
      formData.append('name', product.name);
      formData.append('description', product.description);
      formData.append('price', product.price);
      formData.append('stock', product.stock);
      formData.append('ratings', product.ratings);
      formData.append('isFeatured', product.isFeatured);

      images.forEach(image => {
        formData.append('images', image);
      });

      // Get the correct endpoint based on category
      const endpoint = getCategoryEndpoint(product.category);

      await axios.post(`http://localhost:5000${endpoint}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setShowSuccessPopup(true);
    } catch (error) {
      setMessage(error.response?.data?.message || error.message || 'Failed to add product');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="add-product-container">
      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="success-popup-overlay">
          <div className="success-popup">
            <div className="success-popup-content">
              <div className="success-popup-header">
                <svg className="success-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <h3 className="success-popup-title">Success!</h3>
                <p className="success-popup-message">Product has been added successfully!</p>
              </div>
              <div className="success-popup-actions">
                <button
                  onClick={resetForm}
                  className="btn-primary"
                >
                  Add Another Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="form-header">
        <h1 className="form-title">Add New Product</h1>
        <p className="form-subtitle">Fill in the details below to add a new product to your inventory</p>
      </div>

      {message && !message.includes('successfully') && (
        <div className="error-message">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="error-icon">
            <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
          </svg>
          <span>{message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-grid">
          <div className="form-section">
            <h3 className="section-title">Basic Information</h3>
            
            <div className="form-group">
              <label className="form-label" htmlFor="name">
                Product Name *
              </label>
              <input
                className="form-input"
                id="name"
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                placeholder="Enter product name"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="description">
                Description *
              </label>
              <textarea
                className="form-textarea"
                id="description"
                name="description"
                value={product.description}
                onChange={handleChange}
                rows="4"
                placeholder="Provide a detailed description of the product"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="category">
                Category *
              </label>
              <select
                className="form-select"
                id="category"
                name="category"
                value={product.category}
                onChange={handleChange}
                required
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">Pricing & Inventory</h3>
            
            <div className="form-group">
              <label className="form-label" htmlFor="price">
                Price ($) *
              </label>
              <div className="input-with-icon">
                <span className="input-icon">$</span>
                <input
                  className="form-input with-icon"
                  id="price"
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="stock">
                Stock Quantity *
              </label>
              <input
                className="form-input"
                id="stock"
                type="number"
                name="stock"
                value={product.stock}
                onChange={handleChange}
                min="0"
                placeholder="Enter available quantity"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="ratings">
                Ratings (0-5)
              </label>
              <div className="rating-input-container">
                <input
                  className="form-input"
                  id="ratings"
                  type="number"
                  name="ratings"
                  value={product.ratings}
                  onChange={handleChange}
                  min="0"
                  max="5"
                  step="0.1"
                  placeholder="4.5"
                />
                <div className="rating-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="star-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                      />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3 className="section-title">Product Images</h3>
          
          <div className="form-group">
            <label className="form-label" htmlFor="images">
              Upload Images *
            </label>
            <div className="file-upload-container">
              <label htmlFor="images" className="file-upload-label">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="upload-icon">
                  <path fill="currentColor" d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"/>
                </svg>
                <span>Choose files or drag them here</span>
                <input
                  id="images"
                  type="file"
                  name="images"
                  onChange={handleImageChange}
                  multiple
                  accept="image/*"
                  required
                  className="file-upload-input"
                />
              </label>
            </div>

            {previewImages.length > 0 && (
              <div className="image-previews">
                <p className="previews-title">{previewImages.length} image(s) selected</p>
                <div className="preview-grid">
                  {previewImages.map((preview, index) => (
                    <div key={index} className="preview-item">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="preview-image"
                      />
                      <div className="preview-overlay">
                        <span className="preview-index">{index + 1}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="form-section">
          <h3 className="section-title">Product Settings</h3>
          
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                className="checkbox-input"
                id="isFeatured"
                type="checkbox"
                name="isFeatured"
                checked={product.isFeatured}
                onChange={handleChange}
              />
              <span className="checkbox-custom"></span>
              <span className="checkbox-text">Feature this product on homepage</span>
            </label>
            <p className="checkbox-help">Featured products will be highlighted across the website</p>
          </div>
        </div>

        <div className="form-actions">
          <button
            className="btn-secondary"
            type="button"
            onClick={resetForm}
            disabled={isLoading}
          >
            Reset Form
          </button>
          <button
            className="btn-add"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg className="spinner" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                </svg>
                Adding Product...
              </>
            ) : (
              'Add Product'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;