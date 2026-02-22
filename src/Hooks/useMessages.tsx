import { useState } from 'react';
import { useAdmin } from '../Context API/AdminContext';

export const useMessages = () => {
  const { messages, updateMessageStatus, deleteMessage } = useAdmin();
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredMessages = messages.filter(message => {
    return statusFilter === 'all' || message.status === statusFilter;
  });

  const getUnreadCount = () => {
    return messages.filter(m => m.status === 'unread').length;
  };

  const markAsRead = (id: string) => {
    updateMessageStatus(id, 'read');
  };

  const markAsReplied = (id: string) => {
    updateMessageStatus(id, 'replied');
  };

  return {
    messages: filteredMessages,
    allMessages: messages,
    statusFilter,
    setStatusFilter,
    updateMessageStatus,
    deleteMessage,
    getUnreadCount,
    markAsRead,
    markAsReplied
  };
};