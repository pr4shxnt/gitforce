import { Request, Response } from 'express';
import CalendarMessage from '../models/calendar-message.model';
import GeneralMeetingMessage from '../models/general-meeting-message.model';
import BroadcastMessage from '../models/broadcast-message.model';
import { AuthRequest } from '../middlewares/auth.middleware';

const getModelForChatType = (chatType: string) => {
    switch (chatType) {
        case 'calendar':
            return CalendarMessage;
        case 'general-meeting':
            return GeneralMeetingMessage;
        case 'broadcast-service':
            return BroadcastMessage;
        default:
            return null;
    }
};

export const getMessages = async (req: AuthRequest, res: Response) => {
    try {
        const { chatType } = req.params;
        const Model = getModelForChatType(chatType);
        
        if (!Model) {
            res.status(400).json({ message: 'Invalid chat type' });
            return;
        }

        // Get messages from last 3 months
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

        const messages = await (Model as any).find({
            createdAt: { $gte: threeMonthsAgo }
        })
        .populate('sender', 'name email role')
        .sort({ createdAt: 1 })
        .limit(500); // Limit to last 500 messages

        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching messages', error });
    }
};

export const sendMessage = async (req: AuthRequest, res: Response) => {
    try {
        const { chatType } = req.params;
        const { message, attachments } = req.body;
        const Model = getModelForChatType(chatType);
        
        if (!Model) {
            res.status(400).json({ message: 'Invalid chat type' });
            return;
        }

        // Role-based permission check for broadcast and calendar
        if ((chatType === 'broadcast-service' || chatType === 'calendar') && 
            req.user?.role !== 'admin' && req.user?.role !== 'superuser') {
            res.status(403).json({ 
                message: 'Only admins and superusers can send messages in this chat' 
            });
            return;
        }

        const newMessage = new Model({
            sender: req.user?.id,
            message,
            attachments: attachments || []
        });

        await newMessage.save();
        await (newMessage as any).populate('sender', 'name email role');

        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ message: 'Error sending message', error });
    }
};

export const deleteOldMessages = async (req: Request, res: Response) => {
    try {
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

        const calendarResult = await CalendarMessage.deleteMany({
            createdAt: { $lt: threeMonthsAgo }
        });

        const generalMeetingResult = await GeneralMeetingMessage.deleteMany({
            createdAt: { $lt: threeMonthsAgo }
        });

        const broadcastResult = await BroadcastMessage.deleteMany({
            createdAt: { $lt: threeMonthsAgo }
        });

        res.status(200).json({
            message: 'Old messages deleted successfully',
            deleted: {
                calendar: calendarResult.deletedCount,
                generalMeeting: generalMeetingResult.deletedCount,
                broadcast: broadcastResult.deletedCount
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting old messages', error });
    }
};
