'use client'

import { useState, useEffect } from 'react';
import { useAppSelector } from '@/lib/hooks';
import axios from 'axios';
import StatsCard from '@/components/admin/StatsCard';

interface DashboardStats {
    overview: {
        totalMessages: number;
        messagesLast24h: number;
        totalUsers: number;
        totalProjects: number;
        totalGalleryItems: number;
        totalTeamMembers: number;
        totalMembers: number;
        totalAdmins: number;
    };
    recentActivity: {
        newProjectsThisWeek: number;
        newMembersThisWeek: number;
        messagesLast24h: number;
    };
    chatActivity: {
        calendar: { count: number; percentage: number };
        generalMeeting: { count: number; percentage: number };
        broadcast: { count: number; percentage: number };
    };
    latestMessages: Array<{
        _id: string;
        sender: { name: string; role: string };
        message: string;
        createdAt: string;
        chatType: string;
    }>;
}

export default function DashboardPage() {
    const { token } = useAppSelector((state) => state.adminAuth);
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchDashboardStats();
        // Refresh every 30 seconds for real-time updates
        const interval = setInterval(fetchDashboardStats, 30000);
        return () => clearInterval(interval);
    }, [token]);

    const fetchDashboardStats = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/dashboard/stats`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setStats(response.data);
        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const formatTime = (timestamp: string) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 1) return 'Just now';
        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        return `${days}d ago`;
    };

    if (isLoading || !stats) {
        return (
            <div className="min-h-screen p-6 flex items-center justify-center">
                <div className="text-white text-xl">Loading dashboard...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
                    <p className="text-purple-200/80">Welcome back! Here's what's happening in real-time.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatsCard
                        title="Total Users"
                        value={stats.overview.totalUsers}
                        icon={
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        }
                        gradient="from-blue-500 to-cyan-500"
                    />

                    <StatsCard
                        title="Total Messages"
                        value={stats.overview.totalMessages}
                        icon={
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        }
                        trend={{ value: stats.recentActivity.messagesLast24h, isPositive: true }}
                        gradient="from-purple-500 to-pink-500"
                    />

                    <StatsCard
                        title="Projects"
                        value={stats.overview.totalProjects}
                        icon={
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        }
                        trend={{ value: stats.recentActivity.newProjectsThisWeek, isPositive: true }}
                        gradient="from-green-500 to-emerald-500"
                    />

                    <StatsCard
                        title="Team Members"
                        value={stats.overview.totalTeamMembers}
                        icon={
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        }
                        gradient="from-orange-500 to-red-500"
                    />
                </div>

                {/* Chat Activity */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                    <h2 className="text-xl font-bold text-white mb-6">Chat Activity</h2>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-white">Calendar ({stats.chatActivity.calendar.count})</span>
                                <span className="text-purple-200/60">{stats.chatActivity.calendar.percentage}%</span>
                            </div>
                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500" style={{ width: `${stats.chatActivity.calendar.percentage}%` }} />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-white">General Meeting ({stats.chatActivity.generalMeeting.count})</span>
                                <span className="text-purple-200/60">{stats.chatActivity.generalMeeting.percentage}%</span>
                            </div>
                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500" style={{ width: `${stats.chatActivity.generalMeeting.percentage}%` }} />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-white">Broadcast ({stats.chatActivity.broadcast.count})</span>
                                <span className="text-purple-200/60">{stats.chatActivity.broadcast.percentage}%</span>
                            </div>
                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-orange-500 to-red-500" style={{ width: `${stats.chatActivity.broadcast.percentage}%` }} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                    <h2 className="text-xl font-bold text-white mb-6">Recent Messages</h2>
                    <div className="space-y-3">
                        {stats.latestMessages.map((msg) => (
                            <div key={msg._id} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200">
                                <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex-shrink-0">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <p className="text-white font-medium">{msg.sender.name}</p>
                                        <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/30 text-purple-200">{msg.sender.role}</span>
                                        <span className="text-xs text-purple-200/60">• {msg.chatType}</span>
                                    </div>
                                    <p className="text-sm text-purple-200/80 truncate">{msg.message}</p>
                                    <p className="text-xs text-purple-200/60 mt-1">{formatTime(msg.createdAt)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
