import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { productService } from '../services/productService';

export const useProductDetail = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fallbackImage = `https://picsum.photos/seed/novamarket-${id}/600/450`;

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await productService.getProductById(id);

        setProduct({
          ...data,
          imageUrl: data.imageUrl || fallbackImage,
          formattedPrice: `USD ${Number(data.price).toFixed(2)}`,
          description:
            data.description ||
            'Sin descripción detallada disponible para este producto.'
        });
      } catch (err) {
        const backendMsg = err.response?.data?.message;
        setError(backendMsg || 'No pudimos encontrar el producto que estás buscando.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, fallbackImage]);

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = fallbackImage;
  };

  return {
    product,
    loading,
    error,
    handleImageError
  };
};