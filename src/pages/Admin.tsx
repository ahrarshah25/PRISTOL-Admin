import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../Firebase/config';
import { AdminProvider } from '../Context API/AdminContext';
import Sidebar from '../Components/Admin/Layout/Sidebar';
import Dashboard from './Admin/Dashboard';
import Products from './Admin/Products';
import Orders from './Admin/Orders';
import Messages from './Admin/Messages';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const renderContent = (): React.ReactNode => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'products':
        return <Products />;
      case 'orders':
        return <Orders />;
      case 'messages':
        return <Messages />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AdminProvider>
      <div className="min-h-screen bg-gray-50">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="lg:ml-64 p-4 lg:p-8 pt-20 lg:pt-8">
          {renderContent()}
        </div>
      </div>
    </AdminProvider>
  );
};

export default Admin;