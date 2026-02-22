import React from 'react';
import { useMessages } from '../../Hooks/useMessages';
import MessageCard from '../../Components/Admin/Messages/MessageCard';

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
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Contact Messages</h1>
        <div className="text-right">
          <p className="text-sm text-gray-500">Unread Messages</p>
          <p className="text-xl font-bold text-yellow-600">{unreadCount}</p>
        </div>
      </div>

      <div className="mb-6">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="all">All Messages</option>
          <option value="unread">Unread</option>
          <option value="read">Read</option>
          <option value="replied">Replied</option>
        </select>
      </div>

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

      {messages.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500">No messages found</p>
        </div>
      )}
    </div>
  );
};

export default Messages;