import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc,
  query,
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../Firebase/config';
import type { Product, Order, ContactMessage, AdminContextType } from '../types';

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = (): AdminContextType => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
};

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProducts = async (): Promise<void> => {
    try {
      const querySnapshot = await getDocs(query(collection(db, 'products'), orderBy('createdAt', 'desc')));
      const productsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];
      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchOrders = async (): Promise<void> => {
    try {
      const querySnapshot = await getDocs(query(collection(db, 'orders'), orderBy('createdAt', 'desc')));
      const ordersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Order[];
      setOrders(ordersData);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchMessages = async (): Promise<void> => {
    try {
      const querySnapshot = await getDocs(query(collection(db, 'contactMessages'), orderBy('createdAt', 'desc')));
      const messagesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ContactMessage[];
      setMessages(messagesData);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const refreshData = async (): Promise<void> => {
    setLoading(true);
    await Promise.all([fetchProducts(), fetchOrders(), fetchMessages()]);
    setLoading(false);
  };

  useEffect(() => {
    refreshData();
  }, []);

  const addProduct = async (product: Omit<Product, 'id' | 'createdAt'>): Promise<void> => {
    try {
      const docRef = await addDoc(collection(db, 'products'), {
        ...product,
        createdAt: Timestamp.now().toMillis()
      });
      const newProduct = { ...product, id: docRef.id, createdAt: Date.now() } as Product;
      setProducts([newProduct, ...products]);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const updateProduct = async (id: string, product: Partial<Product>): Promise<void> => {
    try {
      await updateDoc(doc(db, 'products', id), product);
      setProducts(products.map(p => p.id === id ? { ...p, ...product } : p));
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const deleteProduct = async (id: string): Promise<void> => {
    try {
      await deleteDoc(doc(db, 'products', id));
      setProducts(products.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const updateOrderStatus = async (id: string, status: Order['status']): Promise<void> => {
    try {
      await updateDoc(doc(db, 'orders', id), { status });
      setOrders(orders.map(o => o.id === id ? { ...o, status } : o));
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const updateMessageStatus = async (id: string, status: ContactMessage['status']): Promise<void> => {
    try {
      await updateDoc(doc(db, 'contactMessages', id), { status });
      setMessages(messages.map(m => m.id === id ? { ...m, status } : m));
    } catch (error) {
      console.error('Error updating message:', error);
    }
  };

  const deleteMessage = async (id: string): Promise<void> => {
    try {
      await deleteDoc(doc(db, 'contactMessages', id));
      setMessages(messages.filter(m => m.id !== id));
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const value: AdminContextType = {
    products,
    orders,
    messages,
    loading,
    addProduct,
    updateProduct,
    deleteProduct,
    updateOrderStatus,
    updateMessageStatus,
    deleteMessage,
    refreshData
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};