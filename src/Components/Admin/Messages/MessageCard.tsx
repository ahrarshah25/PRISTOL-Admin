import type { FC } from 'react';
import { CheckCircle, Trash2, Clock } from 'lucide-react';
import type { ContactMessage } from '../../../types';

interface MessageCardProps {
  message: ContactMessage;
  onMarkAsRead: (id: string) => void;
  onMarkAsReplied: (id: string) => void;
  onDelete: (id: string) => void;
}

const MessageCard: FC<MessageCardProps> = ({ message, onMarkAsRead, onMarkAsReplied, onDelete }) => {
  const getStatusColor = (status: ContactMessage['status']): string => {
    const colors = {
      unread: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      read: 'bg-blue-100 text-blue-800 border-blue-200',
      replied: 'bg-green-100 text-green-800 border-green-200'
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
    <div className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 ${
      message.status === 'unread' ? 'border-l-yellow-500' :
      message.status === 'read' ? 'border-l-blue-500' : 'border-l-green-500'
    }`}>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {message.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{message.name}</h3>
              <p className="text-sm text-gray-500">{message.email}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full border ${getStatusColor(message.status)}`}>
                  {message.status === 'unread' && <Clock className="w-3 h-3" />}
                  {message.status === 'read' && <CheckCircle className="w-3 h-3" />}
                  {message.status === 'replied' && <CheckCircle className="w-3 h-3" />}
                  {message.status}
                </span>
                <span className="text-xs text-gray-400">{formatDate(message.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-3">
          <h4 className="text-sm font-semibold text-gray-700 mb-1">Subject:</h4>
          <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">{message.subject}</p>
        </div>

        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-1">Message:</h4>
          <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg whitespace-pre-wrap">
            {message.message}
          </p>
        </div>

        <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
          {message.status === 'unread' && (
            <button
              onClick={() => onMarkAsRead(message.id)}
              className="px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all flex items-center gap-1"
            >
              <CheckCircle className="w-4 h-4" />
              Mark as Read
            </button>
          )}
          {message.status !== 'replied' && (
            <button
              onClick={() => onMarkAsReplied(message.id)}
              className="px-3 py-1.5 text-sm bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-all flex items-center gap-1"
            >
              <CheckCircle className="w-4 h-4" />
              Mark as Replied
            </button>
          )}
          <button
            onClick={() => onDelete(message.id)}
            className="px-3 py-1.5 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all flex items-center gap-1"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageCard;