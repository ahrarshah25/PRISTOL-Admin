import React from 'react';
import { useOrders } from '../../Hooks/useOrders';
import OrderTable from '../../Components/Admin/Orders/OrderTable';

const Orders: React.FC = () => {
  const {
    orders,
    statusFilter,
    setStatusFilter,
    updateOrderStatus,
    getTotalRevenue,
    getPendingOrders
  } = useOrders();

  const totalRevenue = getTotalRevenue();
  const pendingOrders = getPendingOrders();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-gray-500">Total Revenue</p>
            <p className="text-xl font-bold text-green-600">${totalRevenue.toFixed(2)}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Pending Orders</p>
            <p className="text-xl font-bold text-yellow-600">{pendingOrders}</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="all">All Orders</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <OrderTable orders={orders} onUpdateStatus={updateOrderStatus} />
    </div>
  );
};

export default Orders;