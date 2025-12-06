import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware.js';
import CalendarMessage from '../models/calendar-message.model.js';
import GeneralMeetingMessage from '../models/general-meeting-message.model.js';
import BroadcastMessage from '../models/broadcast-message.model.js';
import Project from '../models/project.model.js';
import Gallery from '../models/gallery.model.js';
import TeamMember from '../models/team-member.model.js';
import Member from '../models/member.model.js';
import Admin from '../models/admin.model.js';

export const getDashboardStats = async (req: AuthRequest, res: Response) => {
    try {
        // Get message counts
        const calendarCount = await CalendarMessage.countDocuments();
        const generalMeetingCount = await GeneralMeetingMessage.countDocuments();
        const broadcastCount = await BroadcastMessage.countDocuments();
        const totalMessages = calendarCount + generalMeetingCount + broadcastCount;

        // Get recent messages (last 24 hours)
        const oneDayAgo = new Date();
        oneDayAgo.setDate(oneDayAgo.getDate() - 1);
        
        const recentCalendar = await CalendarMessage.countDocuments({ createdAt: { $gte: oneDayAgo } });
        const recentGeneral = await GeneralMeetingMessage.countDocuments({ createdAt: { $gte: oneDayAgo } });
        const recentBroadcast = await BroadcastMessage.countDocuments({ createdAt: { $gte: oneDayAgo } });
        const messagesLast24h = recentCalendar + recentGeneral + recentBroadcast;

        // Get content counts
        const projectCount = await Project.countDocuments();
        const galleryCount = await Gallery.countDocuments();
        const teamCount = await TeamMember.countDocuments({ active: true });
        
        // Get user counts
        const memberCount = await Member.countDocuments({ isActive: true });
        const adminCount = await Admin.countDocuments();
        const totalUsers = memberCount + adminCount;

        // Get recent activity (last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const recentProjects = await Project.countDocuments({ createdAt: { $gte: sevenDaysAgo } });
        const recentMembers = await Member.countDocuments({ joinedAt: { $gte: sevenDaysAgo } });

        // Get latest messages for activity feed
        const latestMessages = await Promise.all([
            CalendarMessage.find().sort({ createdAt: -1 }).limit(5).populate('sender', 'name role'),
            GeneralMeetingMessage.find().sort({ createdAt: -1 }).limit(5).populate('sender', 'name role'),
            BroadcastMessage.find().sort({ createdAt: -1 }).limit(5).populate('sender', 'name role')
        ]);

        // Combine and sort messages, adding chat type manually
        const allRecentMessages = [
            ...latestMessages[0].map(msg => ({ ...msg.toObject(), chatType: 'Calendar' })),
            ...latestMessages[1].map(msg => ({ ...msg.toObject(), chatType: 'General Meeting' })),
            ...latestMessages[2].map(msg => ({ ...msg.toObject(), chatType: 'Broadcast' }))
        ]
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 10);

        // Calculate chat activity percentages
        const chatActivity = {
            calendar: {
                count: calendarCount,
                percentage: totalMessages > 0 ? Math.round((calendarCount / totalMessages) * 100) : 0
            },
            generalMeeting: {
                count: generalMeetingCount,
                percentage: totalMessages > 0 ? Math.round((generalMeetingCount / totalMessages) * 100) : 0
            },
            broadcast: {
                count: broadcastCount,
                percentage: totalMessages > 0 ? Math.round((broadcastCount / totalMessages) * 100) : 0
            }
        };

        res.status(200).json({
            overview: {
                totalMessages,
                messagesLast24h,
                totalUsers,
                totalProjects: projectCount,
                totalGalleryItems: galleryCount,
                totalTeamMembers: teamCount,
                totalMembers: memberCount,
                totalAdmins: adminCount
            },
            recentActivity: {
                newProjectsThisWeek: recentProjects,
                newMembersThisWeek: recentMembers,
                messagesLast24h
            },
            chatActivity,
            latestMessages: allRecentMessages.map(msg => ({
                _id: msg._id,
                sender: msg.sender,
                message: msg.message.substring(0, 100),
                createdAt: msg.createdAt,
                chatType: msg.chatType
            }))
        });
    } catch (error) {
        console.error('Dashboard stats error:', error);
        res.status(500).json({ message: 'Error fetching dashboard statistics', error });
    }
};
