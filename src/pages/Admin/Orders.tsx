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
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
        <div className="flex items-center gap-4">
          <div className="bg-green-100 px-4 py-2 rounded-xl">
            <p className="text-sm text-green-800 font-medium">
              Revenue: <span className="font-bold">Rs. {totalRevenue.toLocaleString()}</span>
            </p>
          </div>
          <div className="bg-yellow-100 px-4 py-2 rounded-xl">
            <p className="text-sm text-yellow-800 font-medium">
              Pending: <span className="font-bold">{pendingOrders}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full sm:w-48 px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
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