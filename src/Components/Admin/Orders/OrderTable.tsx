import type { FC } from 'react';
import { Package, ChevronDown, ChevronUp } from 'lucide-react';
import type { Order } from '../../../types';
import { useState } from 'react';

interface OrderTableProps {
  orders: Order[];
  onUpdateStatus: (id: string, status: Order['status']) => void;
}

const OrderTable: FC<OrderTableProps> = ({ orders, onUpdateStatus }) => {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

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

  const toggleExpand = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
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
              <>
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleExpand(order.id)}
                        className="p-1 hover:bg-gray-200 rounded-lg transition-colors"
                      >
                        {expandedOrder === order.id ? (
                          <ChevronUp className="w-4 h-4 text-gray-500" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gray-500" />
                        )}
                      </button>
                      <span className="text-sm font-mono text-gray-900">
                        #{order.id.slice(-8)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{order.fullName}</p>
                      <p className="text-xs text-gray-500">{order.email}</p>
                      <p className="text-xs text-gray-400">{order.phone}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {order.items?.length || 0} item{order.items?.length > 1 ? 's' : ''}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-gray-900">
                      Rs. {order.totalAmount?.toLocaleString() || order.total?.toLocaleString() || 0}
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
                {expandedOrder === order.id && (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 bg-gray-50">
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Order Items:</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {order.items?.map((item, index) => (
                            <div key={index} className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm">
                              <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                <img
                                  src={item.imageUrl}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.currentTarget.src = 'https://via.placeholder.com/64?text=PRISTOL';
                                  }}
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                                <div className="flex items-center justify-between mt-1">
                                  <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                                  <span className="text-xs font-semibold text-green-600">
                                    Rs. {(item.price * item.quantity).toLocaleString()}
                                  </span>
                                </div>
                                <p className="text-xs text-gray-400 mt-1">
                                  Rs. {item.price.toLocaleString()} each
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="flex flex-wrap gap-4 justify-end">
                            <div className="text-sm">
                              <span className="text-gray-500">Subtotal: </span>
                              <span className="font-medium">Rs. {order.subtotal?.toLocaleString() || 0}</span>
                            </div>
                            <div className="text-sm">
                              <span className="text-gray-500">Shipping: </span>
                              <span className="font-medium">
                                {order.shipping === 0 ? 'Free' : `Rs. ${order.shipping?.toLocaleString()}`}
                              </span>
                            </div>
                            <div className="text-sm">
                              <span className="text-gray-500">Tax: </span>
                              <span className="font-medium">Rs. {order.tax?.toLocaleString() || 0}</span>
                            </div>
                            <div className="text-base font-bold text-green-600">
                              Total: Rs. {order.totalAmount?.toLocaleString() || order.total?.toLocaleString() || 0}
                            </div>
                          </div>
                        </div>

                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <p className="text-xs text-gray-500">
                            <span className="font-medium">Delivery Address:</span> {order.address}, {order.city} {order.postalCode}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            <span className="font-medium">Payment Method:</span> {order.paymentMethod}
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>

      <div className="lg:hidden">
        {orders.map((order) => (
          <div key={order.id} className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-mono font-medium">#{order.id.slice(-8)}</span>
              <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
            </div>
            
            <p className="text-sm font-medium text-gray-900">{order.fullName}</p>
            <p className="text-xs text-gray-500 mb-2">{order.email}</p>
            
            <div className="space-y-2 mb-3">
              {order.items?.map((item, index) => (
                <div key={index} className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg">
                  <div className="w-10 h-10 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/40?text=PRISTOL';
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{item.name}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">x{item.quantity}</span>
                      <span className="text-xs font-semibold">Rs. {(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold">Total:</span>
              <span className="text-base font-bold text-green-600">
                Rs. {order.totalAmount?.toLocaleString() || order.total?.toLocaleString() || 0}
              </span>
            </div>
            
            <select
              value={order.status}
              onChange={(e) => onUpdateStatus(order.id, e.target.value as Order['status'])}
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
            >
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderTable;