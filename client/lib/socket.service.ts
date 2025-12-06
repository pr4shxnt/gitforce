import { io, Socket } from 'socket.io-client';

class SocketService {
    private socket: Socket | null = null;
    private token: string | null = null;

    connect(token: string) {
        if (this.socket?.connected) {
            return this.socket;
        }

        this.token = token;
        // Socket.IO connects to root, not /api
        const socketUrl = process.env.NEXT_PUBLIC_API_URL 
            ? process.env.NEXT_PUBLIC_API_URL.replace('/api', '') 
            : 'http://localhost:5000';
            
        this.socket = io(socketUrl, {
            auth: {
                token
            },
            transports: ['websocket', 'polling']
        });

        this.socket.on('connect', () => {
            console.log('Socket connected');
        });

        this.socket.on('disconnect', () => {
            console.log('Socket disconnected');
        });

        this.socket.on('error', (error: any) => {
            console.error('Socket error:', error);
        });

        return this.socket;
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    }

    joinRoom(chatType: string) {
        if (this.socket) {
            this.socket.emit('join-room', chatType);
        }
    }

    leaveRoom(chatType: string) {
        if (this.socket) {
            this.socket.emit('leave-room', chatType);
        }
    }

    sendMessage(chatType: string, message: string, attachments?: any[]) {
        if (this.socket) {
            this.socket.emit('send-message', {
                chatType,
                message,
                attachments
            });
        }
    }

    onNewMessage(callback: (message: any) => void) {
        if (this.socket) {
            this.socket.on('new-message', callback);
        }
    }

    onUserJoined(callback: (data: any) => void) {
        if (this.socket) {
            this.socket.on('user-joined', callback);
        }
    }

    onUserLeft(callback: (data: any) => void) {
        if (this.socket) {
            this.socket.on('user-left', callback);
        }
    }

    onUserTyping(callback: (data: any) => void) {
        if (this.socket) {
            this.socket.on('user-typing', callback);
        }
    }

    sendTyping(chatType: string, isTyping: boolean) {
        if (this.socket) {
            this.socket.emit('typing', { chatType, isTyping });
        }
    }

    getSocket() {
        return this.socket;
    }
}

export default new SocketService();
