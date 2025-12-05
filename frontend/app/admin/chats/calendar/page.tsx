'use client'

import { useState } from 'react';
import { getMessagesByChatType, getUserById, getRelativeTime } from '@/lib/mockData';

export default function CalendarChatPage() {
  const messages = getMessagesByChatType('calendar');
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock send - in real app would send to backend
    setNewMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 flex flex-col">
      {/* Header */}
      <div className="bg-white/5 backdrop-blur-xl border-b border-white/10 p-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500">
              <span className="text-2xl">📅</span>
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white">Calendar & Events</h1>
              <p className="text-sm text-purple-200/70">Schedule meetings, events, and deadlines</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              <span className="text-sm text-green-200 font-medium">8 Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-5xl mx-auto space-y-4">
          {messages.map((message) => {
            const user = getUserById(message.userId);
            const isCurrentUser = message.userId === '1'; // Mock current user

            return (
              <div
                key={message.id}
                className={`flex gap-4 ${isCurrentUser ? 'flex-row-reverse' : ''}`}
              >
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-xl">
                    {user?.avatar}
                  </div>
                </div>

                {/* Message Content */}
                <div className={`flex-1 max-w-2xl ${isCurrentUser ? 'flex flex-col items-end' : ''}`}>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-sm font-medium text-white">{user?.name}</span>
                    <span className="text-xs text-purple-200/60">{getRelativeTime(message.timestamp)}</span>
                  </div>
                  
                  <div className={`p-4 rounded-2xl ${
                    isCurrentUser
                      ? 'bg-gradient-to-br from-purple-500/30 to-pink-500/30 border border-purple-500/30'
                      : 'bg-white/10 border border-white/10'
                  } backdrop-blur-xl`}>
                    <p className="text-white">{message.content}</p>
                    
                    {/* Reactions */}
                    {message.reactions && message.reactions.length > 0 && (
                      <div className="flex gap-2 mt-3">
                        {message.reactions.map((reaction, idx) => (
                          <div
                            key={idx}
                            className="px-2 py-1 rounded-full bg-white/10 border border-white/20 text-xs flex items-center gap-1"
                          >
                            <span>{reaction.emoji}</span>
                            <span className="text-purple-200">{reaction.count}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Message Input */}
      <div className="bg-white/5 backdrop-blur-xl border-t border-white/10 p-6">
        <div className="max-w-5xl mx-auto">
          <form onSubmit={handleSendMessage} className="flex gap-4">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
            />
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <span>Send</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
