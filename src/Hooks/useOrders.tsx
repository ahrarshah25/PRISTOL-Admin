import { useState } from 'react';
import { useAdmin } from '../Context API/AdminContext';
import type { Order } from '../types';

export const useOrders = () => {
  const { orders, updateOrderStatus } = useAdmin();
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredOrders = orders.filter((order: Order) => {
    return statusFilter === 'all' || order.status === statusFilter;
  });

  const getOrderById = (id: string): Order | undefined => {
    return orders.find((o: Order) => o.id === id);
  };

  const getTotalRevenue = (): number => {
    return orders
      .filter((o: Order) => o.status === 'delivered')
      .reduce((sum: number, order: Order) => sum + order.totalAmount, 0);
  };

  const getPendingOrders = (): number => {
    return orders.filter((o: Order) => o.status === 'pending').length;
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