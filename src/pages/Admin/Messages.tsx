import React from 'react';
import { useMessages } from '../../Hooks/useMessages';
import MessageCard from '../../Components/Admin/Messages/MessageCard';
import { Mail } from 'lucide-react';

const Messages: React.FC = () => {
  const {
    messages,
    statusFilter,
    setStatusFilter,
    getUnreadCount,
    markAsRead,
    markAsReplied,
    deleteMessage
  } = useMessages();

  const unreadCount = getUnreadCount();

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Contact Messages</h1>
        <div className="bg-yellow-100 px-4 py-2 rounded-xl">
          <p className="text-sm text-yellow-800 font-medium">
            Unread: <span className="font-bold">{unreadCount}</span>
          </p>
        </div>
      </div>

      <div className="mb-6">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full sm:w-48 px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="all">All Messages</option>
          <option value="unread">Unread</option>
          <option value="read">Read</option>
          <option value="replied">Replied</option>
        </select>
      </div>

      {messages.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
          <Mail className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No messages found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {messages.map((message) => (
            <MessageCard
              key={message.id}
              message={message}
              onMarkAsRead={markAsRead}
              onMarkAsReplied={markAsReplied}
              onDelete={deleteMessage}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Messages;