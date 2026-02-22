import React from 'react';
import { Package, ShoppingCart, MessageSquare, DollarSign } from 'lucide-react';
import { useAdmin } from '../../Context API/AdminContext';
import StatsCard from '../../Components/Admin/Dashboard/StatsCard';

const Dashboard: React.FC = () => {
  const { products, orders, messages } = useAdmin();

  const totalRevenue = orders
    .filter(o => o.status === 'delivered')
    .reduce((sum, order) => sum + order.totalAmount, 0);

  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const unreadMessages = messages.filter(m => m.status === 'unread').length;
  const lowStockProducts = products.filter(p => p.stock < 10).length;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Products"
          value={products.length}
          icon={<Package className="w-6 h-6 text-white" />}
          bgColor="bg-gradient-to-br from-green-500 to-green-600"
        />
        <StatsCard
          title="Total Orders"
          value={orders.length}
          icon={<ShoppingCart className="w-6 h-6 text-white" />}
          bgColor="bg-gradient-to-br from-blue-500 to-blue-600"
        />
        <StatsCard
          title="Total Revenue"
          value={`$${totalRevenue.toFixed(2)}`}
          icon={<DollarSign className="w-6 h-6 text-white" />}
          bgColor="bg-gradient-to-br from-purple-500 to-purple-600"
        />
        <StatsCard
          title="Messages"
          value={messages.length}
          icon={<MessageSquare className="w-6 h-6 text-white" />}
          bgColor="bg-gradient-to-br from-yellow-500 to-yellow-600"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Pending Orders</span>
              <span className="text-sm font-semibold text-yellow-600">{pendingOrders}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Unread Messages</span>
              <span className="text-sm font-semibold text-blue-600">{unreadMessages}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Low Stock Products</span>
              <span className="text-sm font-semibold text-red-600">{lowStockProducts}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 md:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h3>
          <div className="space-y-3">
            {orders.slice(0, 5).map((order) => (
              <div key={order.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-900">{order.customerName}</p>
                  <p className="text-xs text-gray-500">#{order.id.slice(-8)}</p>
                </div>
                <div>
                  <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;