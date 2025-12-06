import { Server as SocketIOServer, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import CalendarMessage from '../models/calendar-message.model';
import GeneralMeetingMessage from '../models/general-meeting-message.model';
import BroadcastMessage from '../models/broadcast-message.model';

interface AuthenticatedSocket extends Socket {
    userId?: string;
    userRole?: string;
}

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

export const initializeSocketIO = (io: SocketIOServer) => {
    // Authentication middleware for Socket.IO
    io.use((socket: AuthenticatedSocket, next) => {
        const token = socket.handshake.auth.token;
        
        if (!token) {
            return next(new Error('Authentication error'));
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as any;
            socket.userId = decoded.id;
            socket.userRole = decoded.role;
            next();
        } catch (error) {
            next(new Error('Authentication error'));
        }
    });

    io.on('connection', (socket: AuthenticatedSocket) => {
        console.log(`User connected: ${socket.userId}`);

        // Join chat rooms
        socket.on('join-room', (chatType: string) => {
            socket.join(chatType);
            console.log(`User ${socket.userId} joined ${chatType}`);
            
            // Notify others in the room
            socket.to(chatType).emit('user-joined', {
                userId: socket.userId,
                timestamp: new Date()
            });
        });

        // Leave chat rooms
        socket.on('leave-room', (chatType: string) => {
            socket.leave(chatType);
            console.log(`User ${socket.userId} left ${chatType}`);
            
            socket.to(chatType).emit('user-left', {
                userId: socket.userId,
                timestamp: new Date()
            });
        });

        // Send message
        socket.on('send-message', async (data: {
            chatType: string;
            message: string;
            attachments?: any[];
        }) => {
            try {
                // Role-based permission check for broadcast and calendar
                if ((data.chatType === 'broadcast-service' || data.chatType === 'calendar') && 
                    socket.userRole !== 'admin' && socket.userRole !== 'superuser') {
                    socket.emit('error', { 
                        message: 'Only admins and superusers can send messages in this chat' 
                    });
                    return;
                }

                const Model = getModelForChatType(data.chatType);
                
                if (!Model) {
                    socket.emit('error', { message: 'Invalid chat type' });
                    return;
                }

                const newMessage = new Model({
                    sender: socket.userId,
                    message: data.message,
                    attachments: data.attachments || []
                });

                await newMessage.save();
                await (newMessage as any).populate('sender', 'name email role');

                // Broadcast to all users in the room (including sender)
                io.to(data.chatType).emit('new-message', newMessage);
            } catch (error) {
                console.error('Error sending message:', error);
                socket.emit('error', { message: 'Failed to send message' });
            }
        });

        // Typing indicator
        socket.on('typing', (data: { chatType: string; isTyping: boolean }) => {
            socket.to(data.chatType).emit('user-typing', {
                userId: socket.userId,
                isTyping: data.isTyping
            });
        });

        // Disconnect
        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.userId}`);
        });
    });

    return io;
};
