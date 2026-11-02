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
  const [fieldErrors, setFieldErrors] = useState({});
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

    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }

    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const formElement = e.currentTarget;
    const currentFullName = (formElement.fullName?.value ?? formData.fullName).trim();
    const currentAddress = (formElement.address?.value ?? formData.address).trim();
    const currentCity = (formElement.city?.value ?? formData.city).trim();
    const currentNotes = (formElement.notes?.value ?? formData.notes).trim();

    setFormData({
      fullName: currentFullName,
      address: currentAddress,
      city: currentCity,
      notes: currentNotes,
    });

    const errors = {};
    if (!currentFullName) {
      errors.fullName = 'Ingresá el nombre completo de quien recibe.';
    }
    if (!currentAddress) {
      errors.address = 'Ingresá la dirección de entrega.';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);

      if (!currentFullName && !currentAddress) {
        setError('Por favor completá tu nombre y dirección de envío.');
      } else if (!currentFullName) {
        setError('Debés ingresar el nombre completo de quien recibe.');
      } else {
        setError('Debés ingresar la dirección de entrega.');
      }
      return;
    }

    setFieldErrors({});

    try {
      setSubmitting(true);
      
      const payload = {
        customerName: currentFullName,
        shippingAddress: {
          address: currentAddress,
          city: currentCity || "",
        },
        notes: currentNotes,
        items: items.map((item) => ({
          productId: String(item.id),
          quantity: parseInt(item.quantity, 10),
        })),
      };

      const createdOrder = await orderService.createOrder(payload);
      const orderId =
        createdOrder?.id ||
        createdOrder?.orderNumber ||
        `NM-${Math.floor(100000 + Math.random() * 900000)}`;

      setOrderSuccess({
        id: orderId,
        customerName: currentFullName,
        shippingAddress: currentCity 
          ? `${currentAddress}, ${currentCity}` 
          : currentAddress,
        totalPaid: totalAmount,
      });
      clearCart();
    } catch (err) {
      const status = err.response?.status;
      const backendMsg = err.response?.data?.message;
      
      if (status === 409) {
        setError('Lo sentimos, uno o más productos de tu carrito se quedaron sin stock justo ahora. Revisá tu carrito.');
      } else {
        setError(
          backendMsg ||
            'No pudimos procesar tu orden en este momento. Verificá los datos e intentá nuevamente.'
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  return {
    formData,
    fieldErrors,
    submitting,
    error,
    orderSuccess,
    handleChange,
    handleSubmit,
    items,
    totalItems,
    totalAmount,
  };
};