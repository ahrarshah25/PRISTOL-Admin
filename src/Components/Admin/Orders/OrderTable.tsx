import type { FC } from 'react';
import { Package } from 'lucide-react';
import type { Order } from '../../../types';

interface OrderTableProps {
  orders: Order[];
  onUpdateStatus: (id: string, status: Order['status']) => void;
}

const OrderTable: FC<OrderTableProps> = ({ orders, onUpdateStatus }) => {
  const getStatusColor = (status: Order['status']): string => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      processing: 'bg-blue-100 text-blue-800 border-blue-200',
      shipped: 'bg-purple-100 text-purple-800 border-purple-200',
      delivered: 'bg-green-100 text-green-800 border-green-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[status];
  };

  const formatDate = (timestamp: number): string => {
    return new Date(timestamp).toLocaleDateString('en-PK', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-green-50 to-green-100">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Order ID</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Customer</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Products</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Total (PKR)</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Date</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm font-mono text-gray-900">
                  #{order.id.slice(-8)}
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{order.customerName}</p>
                    <p className="text-xs text-gray-500">{order.customerEmail}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {order.products.length} item{order.products.length > 1 ? 's' : ''}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-semibold text-gray-900">
                    Rs. {order.totalAmount.toLocaleString()}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {formatDate(order.createdAt)}
                </td>
                <td className="px-6 py-4">
                  <select
                    value={order.status}
                    onChange={(e) => onUpdateStatus(order.id, e.target.value as Order['status'])}
                    className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;