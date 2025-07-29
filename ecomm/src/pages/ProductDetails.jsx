import Details from '../components/DetailsProduct/details'
import RelatedItems from '../components/DetailsProduct/RelatedItems'
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetails = () => {
  const { categoryName, productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/api/${categoryName}/${productId}`);
        setProduct(res.data);
      } catch (err) {
        console.error('Failed to fetch product details:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [categoryName, productId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
  if (!product) return <p>No product found.</p>;

  return <Details product={product} />;
};

export default ProductDetails;
