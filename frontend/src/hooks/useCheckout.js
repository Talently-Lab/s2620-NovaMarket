import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { orderService } from '../services/orderService';

export const useCheckout = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const { items, totalItems, totalAmount, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    address: '',
    city: '',
    notes: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [orderSuccess, setOrderSuccess] = useState(null);

  useEffect(() => {
    if (user?.fullName && !formData.fullName) {
      setFormData((prev) => ({ ...prev, fullName: user.fullName }));
    }
  }, [user]);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate('/login', { replace: true });
    } else if (items.length === 0 && !orderSuccess) {
      navigate('/categorias', { replace: true });
    }
  }, [user, authLoading, items.length, orderSuccess, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.fullName.trim() || !formData.address.trim()) {
      setError('Por favor completá tu nombre y dirección de envío.');
      return;
    }

    try {
      setSubmitting(true);
      const payload = {
        customerName: formData.fullName.trim(),
        shippingAddress: formData.city
          ? `${formData.address.trim()}, ${formData.city.trim()}`
          : formData.address.trim(),
        notes: formData.notes.trim(),
        total: Number(totalAmount.toFixed(2)),
        items: items.map((item) => ({
          productId: item.id,
          name: item.name,
          price: Number(item.price),
          quantity: Number(item.quantity),
        })),
      };

      const createdOrder = await orderService.createOrder(payload);
      const orderId = createdOrder?.id || createdOrder?.orderNumber || `NM-${Math.floor(100000 + Math.random() * 900000)}`;

      setOrderSuccess({
        id: orderId,
        customerName: formData.fullName,
        shippingAddress: payload.shippingAddress,
        totalPaid: totalAmount,
      });
      clearCart();
    } catch (err) {
      const backendMsg = err.response?.data?.message;
      setError(backendMsg || 'No pudimos procesar tu orden en este momento. Verificá los datos e intentá nuevamente.');
    } finally {
      setSubmitting(false);
    }
  };

  return {
    formData,
    submitting,
    error,
    orderSuccess,
    handleChange,
    handleSubmit,
    items,
    totalItems,
    totalAmount
  };
};