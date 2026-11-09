import { useState, useEffect, useCallback } from 'react';
import { productService } from '../services/productService';

const INITIAL_FORM_STATE = {
  name: '',
  categoryId: '',
  price: '',
  stock: '0',
  imageUrl: '',
  description: '',
  brand: 'NovaMarket',
};

export const useAdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [formError, setFormError] = useState(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [prodsData, catsData] = await Promise.all([
        productService.getProducts('Todos'),
        productService.getCategories(),
      ]);

      setProducts(Array.isArray(prodsData) ? prodsData : []);
      setCategories(Array.isArray(catsData) ? catsData : []);
    } catch (err) {
      const backendMsg = err.response?.data?.message;
      setError(backendMsg || 'No se pudieron cargar los datos del catálogo.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenCreate = () => {
    setEditingProduct(null);
    setFormData({
      ...INITIAL_FORM_STATE,
      categoryId: categories[0]?.id ? String(categories[0].id) : '',
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product) => {
    setEditingProduct(product);
    const resolvedCatId = product.categoryId || product.category?.id || (categories[0]?.id ?? '');

    setFormData({
      name: product.name || '',
      categoryId: String(resolvedCatId),
      price: product.price ?? '',
      stock: product.stock ?? 0,
      imageUrl: product.imageUrl || '',
      description: product.description || '',
      brand: product.brand || 'NovaMarket',
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingProduct(null);
    setFormError(null);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    const trimmedName = formData.name?.trim();
    const numPrice = parseFloat(formData.price);
    const numStock = parseInt(formData.stock, 10);
    const catId = parseInt(formData.categoryId, 10);

    if (!trimmedName || isNaN(numPrice) || numPrice <= 0) {
      return setFormError('El nombre y un precio válido (> 0) son obligatorios.');
    }

    if (!catId || isNaN(catId) || catId <= 0) {
      return setFormError('Debes seleccionar una categoría válida.');
    }

    if (isNaN(numStock) || numStock < 0) {
      return setFormError('El stock no puede ser negativo.');
    }

    try {
      setSaving(true);
      if (editingProduct) {
        const updated = await productService.updateProduct(editingProduct.id, formData);
        setProducts((prev) =>
          prev.map((item) => (item.id === editingProduct.id ? updated : item))
        );
      } else {
        const created = await productService.createProduct(formData);
        setProducts((prev) => [created, ...prev]);
      }
      setIsModalOpen(false);
      setEditingProduct(null);
    } catch (err) {
      const status = err.response?.status;
      const backendMsg = err.response?.data?.message || err.response?.data?.error;
      if (status === 403) {
        setFormError('Permiso denegado (403): Tu usuario necesita rol ADMIN.');
      } else {
        setFormError(
          Array.isArray(backendMsg)
            ? backendMsg.join(', ')
            : backendMsg || 'Ocurrió un error al guardar el producto.'
        );
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (product) => {
    try {
      setError(null);
      await productService.deleteProduct(product.id);
      setProducts((prev) => prev.filter((item) => item.id !== product.id));
    } catch (err) {
      const status = err.response?.status;
      const backendMsg = err.response?.data?.message;
      const message =
        status === 403
          ? 'Permiso denegado (403): Solo un usuario ADMIN puede eliminar productos.'
          : backendMsg || 'No se pudo eliminar el producto.';
      setError(message);
      throw err;
    }
  };

  const handleImageError = (e, id) => {
    e.target.onerror = null;
    e.target.src = `https://picsum.photos/seed/novamarket-${id || 'default'}/100/100`;
  };

  const formatPrice = (price) => `USD ${Number(price).toFixed(2)}`;

  return {
    products,
    categories,
    loading,
    saving,
    error,
    isModalOpen,
    editingProduct,
    formData,
    formError,
    handleOpenCreate,
    handleOpenEdit,
    handleCloseModal,
    handleChange,
    handleSubmit,
    handleDelete,
    handleImageError,
    formatPrice,
  };
};