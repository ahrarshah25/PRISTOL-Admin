import { useState } from 'react';
import { useAdmin } from '../Context API/AdminContext';
import type { ContactMessage } from '../types';

export const useMessages = () => {
  const { messages, updateMessageStatus, deleteMessage } = useAdmin();
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredMessages = messages.filter((message: ContactMessage) => {
    return statusFilter === 'all' || message.status === statusFilter;
  });

  const getUnreadCount = (): number => {
    return messages.filter((m: ContactMessage) => m.status === 'unread').length;
  };

  const markAsRead = (id: string): void => {
    updateMessageStatus(id, 'read');
  };

  const markAsReplied = (id: string): void => {
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