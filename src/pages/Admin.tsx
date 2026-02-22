import React, { useState } from 'react';
import { AdminProvider } from '../Context API/AdminContext';
import Sidebar from '../Components/Admin/Layout/Sidebar';
import Dashboard from './Admin/Dashboard';
import Products from './Admin/Products';
import Orders from './Admin/Orders';
import Messages from './Admin/Messages';
import Settings from './Admin/Settings';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'products':
        return <Products />;
      case 'orders':
        return <Orders />;
      case 'messages':
        return <Messages />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AdminProvider>
      <div className="min-h-screen bg-gray-50">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="ml-64 p-8">
          {renderContent()}
        </div>
      </div>
    </AdminProvider>
  );
};

export default Admin;