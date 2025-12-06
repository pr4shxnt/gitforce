'use client'

import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { fetchMessages, addMessage, setConnected, setTypingUser } from '@/lib/ChatSlice';
import socketService from '@/lib/socket.service';
import ChatMessage from '@/components/admin/ChatMessage';
import ChatInput from '@/components/admin/ChatInput';

export default function CalendarChatPage() {
    const dispatch = useAppDispatch();
    const { token, user } = useAppSelector((state) => state.adminAuth);
    const { messages, isConnected, typingUsers } = useAppSelector((state) => state.chat);
    const [isLoading, setIsLoading] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatType = 'calendar';

    useEffect(() => {
        if (!token || !user) return;

        // Connect to Socket.IO
        socketService.connect(token);
        dispatch(setConnected(true));

        // Join the calendar room
        socketService.joinRoom(chatType);

        // Fetch message history
        dispatch(fetchMessages({ chatType, token })).then(() => {
            setIsLoading(false);
        });

        // Listen for new messages
        socketService.onNewMessage((message) => {
            dispatch(addMessage({ chatType, message }));
        });

        // Listen for typing indicators
        socketService.onUserTyping((data) => {
            dispatch(setTypingUser({ chatType, userId: data.userId, isTyping: data.isTyping }));
        });

        return () => {
            socketService.leaveRoom(chatType);
        };
    }, [token, user, dispatch]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages[chatType]]);

    const handleSendMessage = (message: string) => {
        if (!user) return;
        
        // Check if user has permission
        if (user.role !== 'admin' && user.role !== 'superuser') {
            alert('Only admins and superusers can send messages in this chat');
            return;
        }

        socketService.sendMessage(chatType, message);
    };

    const handleTyping = (isTyping: boolean) => {
        socketService.sendTyping(chatType, isTyping);
    };

    const canSendMessage = user?.role === 'admin' || user?.role === 'superuser';

    return (
        <div className="flex flex-col h-screen">
            {/* Header */}
            <div className="p-6 border-b border-white/10 bg-white/5 backdrop-blur-xl">
                <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">📅 Calendar Chat</h1>
                        <p className="text-sm text-purple-200/60">
                            {isConnected ? '🟢 Connected' : '🔴 Disconnected'} 
                            {!canSendMessage && ' • View Only (Admin/Superuser can send)'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {isLoading ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-purple-200">Loading messages...</div>
                    </div>
                ) : messages[chatType]?.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center text-purple-200/60">
                            <p>No messages yet</p>
                            <p className="text-sm mt-2">Start the conversation!</p>
                        </div>
                    </div>
                ) : (
                    <>
                        {messages[chatType]?.map((message) => (
                            <ChatMessage
                                key={message._id}
                                message={message}
                                isOwnMessage={message.sender._id === user?._id}
                            />
                        ))}
                        {typingUsers[chatType]?.length > 0 && (
                            <div className="text-sm text-purple-200/60 italic px-4">
                                Someone is typing...
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </>
                )}
            </div>

            {/* Input */}
            <ChatInput
                onSendMessage={handleSendMessage}
                onTyping={handleTyping}
                disabled={!canSendMessage}
                placeholder={canSendMessage ? "Type a message..." : "Only admins can send messages here"}
            />
        </div>
    );
}
