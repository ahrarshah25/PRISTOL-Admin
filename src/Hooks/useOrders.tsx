import { useState } from 'react';
import { useAdmin } from '../Context API/AdminContext';

export const useOrders = () => {
  const { orders, updateOrderStatus } = useAdmin();
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredOrders = orders.filter(order => {
    return statusFilter === 'all' || order.status === statusFilter;
  });

  const getOrderById = (id: string) => {
    return orders.find(o => o.id === id);
  };

  const getTotalRevenue = () => {
    return orders
      .filter(o => o.status === 'delivered')
      .reduce((sum, order) => sum + order.totalAmount, 0);
  };

  const getPendingOrders = () => {
    return orders.filter(o => o.status === 'pending').length;
  };

  return {
    orders: filteredOrders,
    allOrders: orders,
    statusFilter,
    setStatusFilter,
    updateOrderStatus,
    getOrderById,
    getTotalRevenue,
    getPendingOrders
  };
};