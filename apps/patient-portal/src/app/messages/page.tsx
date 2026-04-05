'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Paperclip, Phone, Video, MoreVertical, Search, CheckCheck } from 'lucide-react';

const conversations = [
  {
    id: '1',
    name: 'Dr. Rajesh Sharma',
    avatar: 'RS',
    lastMessage: 'Please follow the prescribed diet strictly.',
    time: '10:30 AM',
    unread: 2,
    online: true,
  },
  {
    id: '2',
    name: 'Dr. Priya Patel',
    avatar: 'PP',
    lastMessage: 'Your next appointment is scheduled.',
    time: 'Yesterday',
    unread: 0,
    online: false,
  },
  {
    id: '3',
    name: 'Support Team',
    avatar: 'ST',
    lastMessage: 'How can we help you today?',
    time: '2 days ago',
    unread: 0,
    online: true,
  },
];

const messages = [
  { id: 1, sender: 'doctor', text: 'Hello! How are you feeling after the treatment?', time: '10:00 AM' },
  { id: 2, sender: 'patient', text: 'Much better, thank you doctor!', time: '10:05 AM' },
  { id: 3, sender: 'doctor', text: 'Please follow the prescribed diet strictly.', time: '10:30 AM' },
];

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState('');

  return (
    <div className="h-[calc(100vh-180px)] flex gap-6">
      {/* Sidebar - Conversations */}
      <div className="w-80 bg-white rounded-2xl shadow-sm border border-[#E8E2D5] flex flex-col">
        <div className="p-4 border-b border-[#E8E2D5]">
          <h2 className="font-serif text-xl font-semibold text-[#2D5A3D]">Messages</h2>
          <div className="relative mt-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-[#E8E2D5] 
                       focus:border-[#2D5A3D] focus:ring-2 focus:ring-[#2D5A3D]/20 outline-none text-sm"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={`w-full p-4 flex items-center gap-3 hover:bg-[#F8F6F0] transition-colors border-b border-[#E8E2D5]
                        ${selectedChat.id === chat.id ? 'bg-[#2D5A3D]/5 border-l-4 border-l-[#2D5A3D]' : ''}`}
            >
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2D5A3D] to-[#4A7C59] 
                              flex items-center justify-center text-white font-medium">
                  {chat.avatar}
                </div>
                {chat.online && (
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 
                                 rounded-full border-2 border-white" />
                )}
              </div>
              <div className="flex-1 text-left">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm">{chat.name}</h4>
                  <span className="text-xs text-gray-400">{chat.time}</span>
                </div>
                <p className="text-xs text-gray-500 truncate mt-0.5">{chat.lastMessage}</p>
              </div>
              {chat.unread > 0 && (
                <span className="w-5 h-5 bg-[#D4853C] text-white text-xs rounded-full 
                               flex items-center justify-center">
                  {chat.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-[#E8E2D5] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-[#E8E2D5] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2D5A3D] to-[#4A7C59] 
                          flex items-center justify-center text-white font-medium">
              {selectedChat.avatar}
            </div>
            <div>
              <h3 className="font-medium">{selectedChat.name}</h3>
              <p className="text-xs text-gray-500">
                {selectedChat.online ? 'Online' : 'Last seen recently'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-[#F8F6F0] rounded-lg transition-colors">
              <Phone className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-[#F8F6F0] rounded-lg transition-colors">
              <Video className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-[#F8F6F0] rounded-lg transition-colors">
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F8F6F0]/50">
          {messages.map((msg, index) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex ${msg.sender === 'patient' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[70%] px-4 py-3 rounded-2xl ${
                msg.sender === 'patient'
                  ? 'bg-[#2D5A3D] text-white rounded-br-md'
                  : 'bg-white border border-[#E8E2D5] text-gray-800 rounded-bl-md shadow-sm'
              }`}>
                <p className="text-sm">{msg.text}</p>
                <p className={`text-xs mt-1 ${msg.sender === 'patient' ? 'text-white/70' : 'text-gray-400'}`}>
                  {msg.time}
                  {msg.sender === 'patient' && <CheckCheck className="w-3 h-3 inline ml-1" />}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-[#E8E2D5]">
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-[#F8F6F0] rounded-lg transition-colors">
              <Paperclip className="w-5 h-5 text-gray-500" />
            </button>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-4 py-3 rounded-xl border border-[#E8E2D5] 
                       focus:border-[#2D5A3D] focus:ring-2 focus:ring-[#2D5A3D]/20 outline-none"
            />
            <button 
              className="p-3 bg-[#2D5A3D] text-white rounded-xl hover:bg-[#1F4030] transition-colors"
              onClick={() => {
                if (newMessage.trim()) {
                  setNewMessage('');
                }
              }}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
