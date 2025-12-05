'use client'

import Link from 'next/link';
import { mockChatStats, getRelativeTime } from '@/lib/mockData';

export default function ChatsOverviewPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Chats</h1>
          <p className="text-purple-200/80">Manage and monitor all your team communications</p>
        </div>

        {/* Chat Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockChatStats.map((chat) => {
            const gradients = {
              'calendar': 'from-blue-500 to-cyan-500',
              'general-meeting': 'from-purple-500 to-pink-500',
              'broadcast-service': 'from-orange-500 to-red-500',
            };

            const routes = {
              'calendar': '/admin/chats/calendar',
              'general-meeting': '/admin/chats/general-meeting',
              'broadcast-service': '/admin/chats/broadcast-service',
            };

            return (
              <Link
                key={chat.type}
                href={routes[chat.type]}
                className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 transition-all duration-300 hover:scale-[1.02] hover:bg-white/10"
              >
                {/* Gradient background */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-br ${gradients[chat.type]}`}></div>
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${gradients[chat.type]} mb-4`}>
                    <span className="text-3xl">{chat.icon}</span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-white mb-2">{chat.name}</h3>
                  <p className="text-sm text-purple-200/70 mb-6">{chat.description}</p>

                  {/* Stats */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-purple-200/60">Messages</span>
                      <span className="text-sm font-semibold text-white">{chat.messageCount}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-purple-200/60">Active Users</span>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                        <span className="text-sm font-semibold text-white">{chat.activeUsers}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-purple-200/60">Last Activity</span>
                      <span className="text-sm font-semibold text-white">{getRelativeTime(chat.lastActivity)}</span>
                    </div>
                  </div>

                  {/* Arrow Icon */}
                  <div className="mt-6 flex items-center gap-2 text-purple-200 group-hover:text-white transition-colors">
                    <span className="text-sm font-medium">Open Chat</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>

                {/* Shine effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-purple-200/60">Total Messages</p>
                <p className="text-2xl font-bold text-white">
                  {mockChatStats.reduce((acc, chat) => acc + chat.messageCount, 0)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-purple-200/60">Active Users</p>
                <p className="text-2xl font-bold text-white">
                  {Math.max(...mockChatStats.map(chat => chat.activeUsers))}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-purple-200/60">Active Chats</p>
                <p className="text-2xl font-bold text-white">{mockChatStats.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
