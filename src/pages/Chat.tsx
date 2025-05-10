// src/components/Chat.tsx
import React, { useEffect, useState, useRef } from 'react';
import ChatService, { ChatNotification, MessageResponse } from '../services/ChatService';
import axiosInstance from '../lib/axiosInstance';
import { FiEdit2, FiTrash2, FiSend, FiMoreVertical, FiX } from 'react-icons/fi';
import { get } from 'http';

interface User {
  userId: number;
  userName: string;
  email: string;
}

interface Message extends MessageResponse {
  isEditing?: boolean;
}

function parseJwt(token: string | null): any {
  if (!token) return {};
  try {
    const payload = token.split('.')[1];
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(
      decodeURIComponent(
        decoded
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      )
    );
  } catch {
    return {};
  }
}

const Chat: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [notification, setNotification] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [editingMessage, setEditingMessage] = useState<Message | null>(null);
  const [currentUser, setCurrentUser] = useState<{ id: number, email: string } | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const decoded = parseJwt(token);
    const currentEmail = decoded.sub || '';
    
    const getCurrentUser = async () => {
      try {
        const { data } = await axiosInstance.get(`/users/me`);
        console.log("currentUser", data.user.userId);
        setCurrentUser({ id: data.user.userId, email: data.user.email });
      } catch (error) {
        console.error('Failed to fetch current user:', error);
      }
    }
    getCurrentUser();

    // Connect to chat service
    ChatService.connect();

    // Load all users
    axiosInstance
      .get<User[]>('/users')
      .then(({ data }) => {
        setUsers(data.filter(u => u.email !== currentEmail));
      })
      .catch(err => {
        console.error('Failed to fetch users:', err);
      });

    // Register notification handler
    ChatService.onNotification((notif: ChatNotification) => {
      setNotification(`${notif.senderName}: ${notif.message}`);
      setTimeout(() => setNotification(null), 5000);
      
      // If notification is from selected user, refresh messages
      if (selectedUser && notif.senderId === selectedUser.userId) {
        loadMessages(selectedUser.userId);
      }
    });

    // Register message handler
    ChatService.onMessage((msg: MessageResponse) => {
      if (selectedUser && (msg.senderId === selectedUser.userId || msg.receiverId === selectedUser.userId)) {
        setMessages(prev => [...prev, msg]);
        setTimeout(() => scrollToBottom(), 100);
      }
    });

    return () => {
      ChatService.disconnect();
    };
  }, []);

  useEffect(() => {
    if (selectedUser) {
      loadMessages(selectedUser.userId);
    }
  }, [selectedUser]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadMessages = (userId: number) => {
    ChatService.fetchHistory(userId)
      .then(history => {
        setMessages(history);
        setTimeout(() => scrollToBottom(), 100);
      })
      .catch(err => {
        console.error('Failed to fetch messages:', err);
      });
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("hi")
    console.log("selectedUser", selectedUser)
    console.log("currentUser", currentUser)
    console.log("newMessage", newMessage)
    if (!newMessage.trim() || !selectedUser || !currentUser) return;
     
    if (editingMessage) {
      // Update message (Note: You need to implement updateMessage in your backend)
      axiosInstance.put(`/messages/${editingMessage.messageId}`, {
        content: newMessage
      })
      .then(() => {
        setMessages(prev => 
          prev.map(m => 
            m.messageId === editingMessage.messageId 
              ? {...m, content: newMessage, isEditing: false} 
              : m
          )
        );
        setEditingMessage(null);
        setNewMessage('');
      })
      .catch(err => {
        console.error('Failed to update message:', err);
      });
    } else {
      // Send new message
      ChatService.sendMessage(selectedUser.userId, newMessage);
      
      // Optimistically add message to UI
      const optimisticMsg: Message = {
        messageId: Date.now(), // Temporary ID
        senderId: currentUser.id,
        senderName: 'You', // Will be replaced with actual user name
        receiverId: selectedUser.userId,
        receiverName: selectedUser.userName,
        content: newMessage,
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, optimisticMsg]);
      setNewMessage('');
    }
  };

  const handleEditMessage = (message: Message) => {
    setEditingMessage(message);
    setNewMessage(message.content);
    setIsMenuOpen(null);
    inputRef.current?.focus();
  };

  const handleDeleteMessage = (messageId: number) => {
    // Confirm before deleting
    if (window.confirm('Are you sure you want to delete this message?')) {
      // Call your API to delete the message
      axiosInstance.delete(`/messages/${messageId}`)
        .then(() => {
          // Remove from UI
          setMessages(prev => prev.filter(m => m.messageId !== messageId));
          setIsMenuOpen(null);
        })
        .catch(err => {
          console.error('Failed to delete message:', err);
        });
    }
  };

  const cancelEdit = () => {
    setEditingMessage(null);
    setNewMessage('');
  };

  const toggleMessageMenu = (messageId: number) => {
    setIsMenuOpen(isMenuOpen === messageId ? null : messageId);
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Chats</h2>
        </div>
        <div className="py-2">
          {users.map((user) => (
            <div
              key={user.userId}
              onClick={() => setSelectedUser(user)}
              className={`flex items-center px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedUser?.userId === user.userId ? 'bg-blue-50' : ''
              }`}
            >
              <div className="h-10 w-fit rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                {user.userName.charAt(0).toUpperCase()}
              </div>
              <div className="ml-3">
                <div className="font-medium text-gray-900">{user.userName}</div>
                <div className="text-sm text-gray-500">{user.email}</div>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        {selectedUser ? (
          <div className="bg-white border-b border-gray-200 p-4 flex items-center">
            <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
              {selectedUser.userName.charAt(0).toUpperCase()}
            </div>
            <div className="ml-3">
              <div className="font-medium text-gray-900">{selectedUser.userName}</div>
              <div className="text-sm text-gray-500">
                {selectedUser.email}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white border-b border-gray-200 p-4">
            <h2 className="text-xl font-semibold text-gray-800">Select a contact to start chatting</h2>
          </div>
        )}

        {/* Notification */}
        {notification && (
          <div className="bg-yellow-50 border-b border-yellow-100 p-3 text-center text-sm text-yellow-800">
            {notification}
          </div>
        )}

        {/* Messages */}
        {selectedUser ? (
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {messages.length === 0 ? (
              <div className="flex justify-center items-center h-full text-gray-500">
                No messages yet. Start a conversation!
              </div>
            ) : (
              <div className="space-y-3">
                {messages.map((message, index) => {
                  const isCurrentUser = currentUser && message.senderId === currentUser.id;
                  const showDate = index === 0 || 
                    formatDate(messages[index-1].timestamp) !== formatDate(message.timestamp);
                  
                  return (
                    <React.Fragment key={message.messageId}>
                      {showDate && (
                        <div className="text-center my-4">
                          <span className="px-3 py-1 bg-gray-200 rounded-full text-xs text-gray-600">
                            {formatDate(message.timestamp)}
                          </span>
                        </div>
                      )}
                      <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                        <div 
                          className={`relative max-w-xl px-4 py-2 rounded-lg shadow ${
                            isCurrentUser ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'
                          }`}
                        >
                          {isCurrentUser && (
                            <button 
                              className="absolute -right-10 top-0 text-gray-500 hover:text-gray-700"
                              onClick={() => toggleMessageMenu(message.messageId)}
                            >
                              <FiMoreVertical />
                            </button>
                          )}
                          
                          {isMenuOpen === message.messageId && isCurrentUser && (
                            <div className="absolute right-0 top-0 mt-8 w-32 bg-white rounded-md shadow-lg z-10">
                              <button 
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                onClick={() => handleEditMessage(message)}
                              >
                                <FiEdit2 className="mr-2" />
                                Edit
                              </button>
                              <button 
                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                                onClick={() => handleDeleteMessage(message.messageId)}
                              >
                                <FiTrash2 className="mr-2" />
                                Delete
                              </button>
                            </div>
                          )}
                          
                          <div>{message.content}</div>
                          <div className={`text-xs mt-1 ${isCurrentUser ? 'text-blue-200' : 'text-gray-500'}`}>
                            {formatTime(message.timestamp)}
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50 p-4">
            <div className="text-center text-gray-500">
              <p className="text-xl mb-2">👋 Welcome to the chat</p>
              <p>Select a contact to start a conversation</p>
            </div>
          </div>
        )}

        {/* Message Input */}
        {selectedUser && (
          <form 
            onSubmit={handleSendMessage} 
            className="bg-white border-t border-gray-200 p-4 flex items-center"
          >
            {editingMessage && (
              <div className="mr-2 py-1 px-2 bg-yellow-100 text-xs rounded flex items-center">
                <span>Editing</span>
                <button onClick={cancelEdit} className="ml-2 text-gray-600 hover:text-gray-800">
                  <FiX />
                </button>
              </div>
            )}
            <input
              ref={inputRef}
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="ml-2 bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center"
            >
              <FiSend />
            </button>
          </form>
        )}
      </main>
    </div>
  );
};

export default Chat;