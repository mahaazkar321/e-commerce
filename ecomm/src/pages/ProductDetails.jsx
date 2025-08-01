import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Details from '../components/DetailsProduct/Details';
import RelatedItems from '../components/DetailsProduct/RelatedItems';

const ProductDetails = () => {
  const { categoryName, productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        let url = `http://localhost:5000/api/${categoryName}/${productId}`;
        if (categoryName === 'best-selling') {
          url = `http://localhost:5000/api/best-selling/${productId}`;
        }

        const res = await axios.get(url);
        setProduct(res.data);
      } catch (err) {
        console.error('Failed to fetch product details:', err);
        setError('Failed to load product. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [categoryName, productId]);

  if (loading) return <p style={{ padding: '2rem', textAlign: 'center' }}>Loading...</p>;
  if (error) return <p style={{ color: 'red', padding: '2rem', textAlign: 'center' }}>{error}</p>;
  if (!product) return <p style={{ padding: '2rem', textAlign: 'center' }}>No product found.</p>;

  return (
    <>
      <Details product={{ ...product, category: categoryName }} />
      <RelatedItems category={categoryName} currentProductId={productId} />
    </>
  );
};

export default ProductDetails;
