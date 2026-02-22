import React from 'react';
import { Mail, CheckCircle, XCircle, Trash2 } from 'lucide-react';
import type { ContactMessage } from '../../../types';

interface MessageCardProps {
  message: ContactMessage;
  onMarkAsRead: (id: string) => void;
  onMarkAsReplied: (id: string) => void;
  onDelete: (id: string) => void;
}

const MessageCard: React.FC<MessageCardProps> = ({ message, onMarkAsRead, onMarkAsReplied, onDelete }) => {
  const getStatusColor = (status: ContactMessage['status']) => {
    const colors = {
      unread: 'bg-yellow-100 text-yellow-800',
      read: 'bg-blue-100 text-blue-800',
      replied: 'bg-green-100 text-green-800'
    };
    return colors[status];
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`bg-white rounded-xl shadow-md p-6 border-l-4 ${
      message.status === 'unread' ? 'border-yellow-500' :
      message.status === 'read' ? 'border-blue-500' : 'border-green-500'
    }`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <Mail className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{message.name}</h3>
            <p className="text-sm text-gray-500">{message.email}</p>
          </div>
        </div>
        <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(message.status)}`}>
          {message.status}
        </span>
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-1">{message.subject}</h4>
        <p className="text-sm text-gray-600">{message.message}</p>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-400">{formatDate(message.createdAt)}</p>
        
        <div className="flex items-center gap-2">
          {message.status !== 'read' && (
            <button
              onClick={() => onMarkAsRead(message.id)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
              title="Mark as read"
            >
              <CheckCircle className="w-4 h-4" />
            </button>
          )}
          {message.status !== 'replied' && (
            <button
              onClick={() => onMarkAsReplied(message.id)}
              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-all"
              title="Mark as replied"
            >
              <CheckCircle className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => onDelete(message.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
            title="Delete message"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageCard;