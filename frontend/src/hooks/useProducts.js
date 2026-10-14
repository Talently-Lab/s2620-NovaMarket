import { useState, useEffect } from 'react';
import { productService } from '../services/productService';

const CATEGORIES = ['Todos', 'Accesorios', 'Periféricos', 'Gadgets'];

export const useProducts = (initialCategory = 'Todos') => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await productService.getProducts(selectedCategory);
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error al obtener productos:', error);
        setError('Hubo un problema al cargar el catálogo.');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  const handleCategoryChange = (category) => {
    if (category !== selectedCategory) {
      setSelectedCategory(category);
    }
  };

  return {
    products,
    categories: CATEGORIES,
    selectedCategory,
    loading,
    error,
    handleCategoryChange
  };
};