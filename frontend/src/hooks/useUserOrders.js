import { useState, useEffect, useCallback } from 'react';
import { orderService } from '../services/orderService';

export const useUserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await orderService.getMyOrders();
      const ordersList = Array.isArray(data) ? data : data.orders || [];
      
      const sorted = ordersList.sort(
        (a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date)
      );
      setOrders(sorted);
    } catch (err) {
      setError(
        err.response?.data?.message || 
        'No pudimos cargar tu historial de compras. Intentá nuevamente.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return { orders, loading, error, refetch: fetchOrders };
};