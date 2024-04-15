import {useEffect, useState} from 'react';
import {toast} from 'react-toastify';
import OrderService from '../services/order.service.js';

export const useOrders = () => {
  const [isLoading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const {data} = await OrderService.findAll();
      setOrders(data.reverse());
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message || 'Ошибка');
    }
  };

  useEffect(() => {
    fetchOrders().finally(() => setLoading(false),
    );
  }, []);

  return {
    isLoading,
    orders,
  };
};