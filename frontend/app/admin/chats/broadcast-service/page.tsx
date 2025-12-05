'use client'

import { useState } from 'react';
import { getMessagesByChatType, getUserById, getRelativeTime, mockUsers } from '@/lib/mockData';

export default function BroadcastServicePage() {
  const messages = getMessagesByChatType('broadcast-service');
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>(['all']);

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock send - in real app would send to backend
    setBroadcastMessage('');
  };

  const toggleRecipient = (userId: string) => {
    if (userId === 'all') {
      setSelectedRecipients(['all']);
    } else {
      const newRecipients = selectedRecipients.filter(id => id !== 'all');
      if (newRecipients.includes(userId)) {
        setSelectedRecipients(newRecipients.filter(id => id !== userId));
      } else {
        setSelectedRecipients([...newRecipients, userId]);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 flex">
      {/* Main Broadcast Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white/5 backdrop-blur-xl border-b border-white/10 p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-red-500">
              <span className="text-2xl">📢</span>
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white">Broadcast Service</h1>
              <p className="text-sm text-purple-200/70">Important announcements and updates</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/20 border border-orange-500/30">
              <svg className="w-4 h-4 text-orange-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="text-sm text-orange-200 font-medium">24 Recipients</span>
            </div>
          </div>
        </div>

        {/* Broadcast Composer */}
        <div className="bg-white/5 backdrop-blur-xl border-b border-white/10 p-6">
          <form onSubmit={handleSendBroadcast} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">
                Broadcast Message
              </label>
              <textarea
                value={broadcastMessage}
                onChange={(e) => setBroadcastMessage(e.target.value)}
                placeholder="Type your announcement here..."
                rows={4}
                className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent transition-all duration-300 backdrop-blur-sm resize-none"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-purple-200 hover:bg-white/20 transition-all duration-200 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                  Attach File
                </button>
                
                <div className="text-sm text-purple-200/60">
                  {selectedRecipients.includes('all') ? 'All users' : `${selectedRecipients.length} selected`}
                </div>
              </div>

              <button
                type="submit"
                disabled={!broadcastMessage.trim()}
                className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl text-white font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
                Send Broadcast
              </button>
            </div>
          </form>
        </div>

        {/* Broadcast History */}
        <div className="flex-1 overflow-y-auto p-6">
          <h2 className="text-lg font-bold text-white mb-4">Broadcast History</h2>
          
          <div className="space-y-4">
            {messages.map((message) => {
              const user = getUserById(message.userId);

              return (
                <div
                  key={message.id}
                  className="p-6 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xl hover:bg-white/15 transition-all duration-200"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-red-400 flex items-center justify-center text-2xl">
                        {user?.avatar}
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <span className="text-sm font-medium text-white">{user?.name}</span>
                          <span className="text-xs text-purple-200/60 ml-2">{getRelativeTime(message.timestamp)}</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/30">
                          <svg className="w-3 h-3 text-orange-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          <span className="text-xs text-orange-200">Sent to all</span>
                        </div>
                      </div>
                      
                      <p className="text-white mb-3">{message.content}</p>
                      
                      {message.reactions && message.reactions.length > 0 && (
                        <div className="flex gap-2">
                          {message.reactions.map((reaction, idx) => (
                            <div
                              key={idx}
                              className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm flex items-center gap-1"
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
      </div>

      {/* Recipients Sidebar */}
      <div className="w-80 bg-white/5 backdrop-blur-xl border-l border-white/10 p-6 hidden lg:block">
        <h2 className="text-lg font-bold text-white mb-4">Select Recipients</h2>
        
        <div className="space-y-2">
          {/* All Users Option */}
          <label className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedRecipients.includes('all')}
              onChange={() => toggleRecipient('all')}
              className="w-5 h-5 rounded border-2 border-white/20 bg-white/10 checked:bg-gradient-to-br checked:from-orange-500 checked:to-red-500"
            />
            <div className="flex-1">
              <p className="text-sm font-medium text-white">All Users</p>
              <p className="text-xs text-purple-200/60">{mockUsers.length} members</p>
            </div>
          </label>

          <div className="h-px bg-white/10 my-4"></div>

          {/* Individual Users */}
          {mockUsers.map((user) => (
            <label
              key={user.id}
              className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedRecipients.includes(user.id) || selectedRecipients.includes('all')}
                onChange={() => toggleRecipient(user.id)}
                disabled={selectedRecipients.includes('all')}
                className="w-5 h-5 rounded border-2 border-white/20 bg-white/10 checked:bg-gradient-to-br checked:from-orange-500 checked:to-red-500 disabled:opacity-50"
              />
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-sm">
                {user.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{user.name}</p>
                <p className="text-xs text-purple-200/60 capitalize">{user.role}</p>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
