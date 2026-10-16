import { useState, useEffect } from 'react';
import { productService } from '../services/productService';

const INITIAL_FORM_STATE = {
  name: '',
  category: 'Accesorios',
  price: '',
  stock: '0',
  imageUrl: '',
  description: ''
};

export const useAdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [formError, setFormError] = useState(null);

  const categories = ['Accesorios', 'Periféricos', 'Gadgets'];

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await productService.getProducts('Todos');
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      const backendMsg = err.response?.data?.message;
      setError(backendMsg || 'No se pudieron cargar los productos. Verificá haber iniciado sesión.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpenCreate = () => {
    setEditingProduct(null);
    setFormData(INITIAL_FORM_STATE);
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || '',
      category: product.category || 'Accesorios',
      price: product.price ?? '',
      stock: product.stock ?? 0,
      imageUrl: product.imageUrl || '',
      description: product.description || ''
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    if (saving) return;
    setIsModalOpen(false);
    setEditingProduct(null);
    setFormError(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (!formData.name.trim() || !formData.price || Number(formData.price) <= 0) {
      return setFormError('Los campos name, price y category son obligatorios.');
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
      const backendMsg = err.response?.data?.message;
      if (status === 403) {
        setFormError('Permiso denegado (403): Tu usuario necesita rol ADMIN para crear o editar productos.');
      } else {
        setFormError(backendMsg || 'Ocurrió un error al guardar el producto.');
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (product) => {
    const confirmed = window.confirm(
      `¿Estás seguro de que deseás eliminar "${product.name}" del catálogo?`
    );

    if (!confirmed) return;

    try {
      setError(null);
      await productService.deleteProduct(product.id);
      setProducts((prev) => prev.filter((item) => item.id !== product.id));
    } catch (err) {
      const status = err.response?.status;
      const backendMsg = err.response?.data?.message;
      if (status === 403) {
        setError('Permiso denegado (403): Solo un usuario con rol ADMIN puede eliminar productos.');
      } else {
        setError(backendMsg || 'No se pudo eliminar el producto.');
      }
    }
  };

  const handleImageError = (e, id) => {
    e.target.onerror = null;
    e.target.src = `https://picsum.photos/seed/novamarket-${id}/100/100`;
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
    formatPrice
  };
};
