import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { db } from '../Firebase/config';
import type { Order } from '../types';

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Order[];
      setOrders(ordersData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredOrders = orders.filter(order => {
    return statusFilter === 'all' || order.status === statusFilter;
  });

  const updateOrderStatus = async (id: string, status: Order['status']) => {
    try {
      await updateDoc(doc(db, 'orders', id), { status });
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const getTotalRevenue = (): number => {
    return orders
      .filter(o => o.status === 'delivered')
      .reduce((sum, order) => sum + (order.totalAmount || order.total || 0), 0);
  };

  const getPendingOrders = (): number => {
    return orders.filter(o => o.status === 'pending').length;
  };

  const getOrderById = (id: string): Order | undefined => {
    return orders.find(o => o.id === id);
  };

  return {
    orders: filteredOrders,
    allOrders: orders,
    loading,
    statusFilter,
    setStatusFilter,
    updateOrderStatus,
    getOrderById,
    getTotalRevenue,
    getPendingOrders
  };
};