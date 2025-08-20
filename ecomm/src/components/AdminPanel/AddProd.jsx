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
  // Update your handleSubmit function
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
    <div className="container mx-auto px-4 py-8 Add">
      {/* Overlay that appears when popup is shown */}
      {showSuccessPopup && (
        <div className="success-popup">
          <div className="success-popup-content">
            <div className="success-popup-header">
              <h3 className="success-popup-title">Success!</h3>
              <button
                onClick={resetForm}
                className="success-popup-close"
                aria-label="Close"
              >
                &times;
              </button>
            </div>
            <p className="success-popup-message">Product has been added successfully!</p>
            <button
              onClick={resetForm}
              className="success-popup-button"
            >
              Add Another Product
            </button>
          </div>
        </div>
      )}

      <h1 className="text-2xl font-bold mb-6 head1">Add New Product</h1>
      {message && (
        <div className={`mb-4 p-3 rounded ${message.includes('successfully') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 formProd">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 formlabel" htmlFor="name">
            Product Name
          </label>
          <input
            className="inputForm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 formlabel" htmlFor="description">
            Description
          </label>
          <textarea
            className="Prodtextarea shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            rows="4"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 formlabel" htmlFor="price">
            Price
          </label>
          <input
            className="inputForm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="price"
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 formlabel" htmlFor="category">
            Category
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 formlabel" htmlFor="stock">
            Stock Quantity
          </label>
          <input
            className="inputFormshadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="stock"
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            min="0"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 formlabel" htmlFor="ratings">
            Ratings (0-5)
          </label>
          <input
            className="inputForm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="ratings"
            type="number"
            name="ratings"
            value={product.ratings}
            onChange={handleChange}
            min="0"
            max="5"
            step="0.1"
          />
        </div>

        <div className="mb-4 flex items-center">
          <input
            className="inputForm mr-2 leading-tight"
            id="isFeatured"
            type="checkbox"
            name="isFeatured"
            checked={product.isFeatured}
            onChange={handleChange}
          />
          <label className="text-gray-700 text-sm font-bold formlabel" htmlFor="isFeatured">
            Featured Product
          </label>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2 formlabel" htmlFor="images">
            Product Images
          </label>
          <input
            className="inputForm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="images"
            type="file"
            name="images"
            onChange={handleImageChange}
            multiple
            accept="image/*"
            required
          />

          {previewImages.length > 0 && (
            <div className="preview-container">
              {previewImages.map((preview, index) => (
                <img
                  key={index}
                  src={preview}
                  alt={`Preview ${index}`}
                  className="preview-thumbnail"
                />
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Adding...' : 'Add Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;