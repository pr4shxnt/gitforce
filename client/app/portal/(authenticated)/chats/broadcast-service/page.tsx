'use client'

import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { fetchMessages, addMessage, setConnected, setTypingUser } from '@/lib/ChatSlice';
import socketService from '@/lib/socket.service';
import ChatMessage from '@/components/admin/ChatMessage';
import ChatInput from '@/components/admin/ChatInput';

export default function BroadcastServiceChatPage() {
    const dispatch = useAppDispatch();
    const { token, user } = useAppSelector((state) => state.adminAuth);
    const { messages, isConnected, typingUsers } = useAppSelector((state) => state.chat);
    const [isLoading, setIsLoading] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatType = 'broadcast-service';

    useEffect(() => {
        if (!token || !user) return;

        socketService.connect(token);
        dispatch(setConnected(true));
        socketService.joinRoom(chatType);

        dispatch(fetchMessages({ chatType, token })).then(() => {
            setIsLoading(false);
        });

        socketService.onNewMessage((message) => {
            dispatch(addMessage({ chatType, message }));
        });

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
        
        if (user.role !== 'admin' && user.role !== 'superuser') {
            alert('Only admins and superusers can send broadcast messages');
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
            <div className="p-6 border-b border-white/10 bg-white/5 backdrop-blur-xl">
                <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-red-500">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">📢 Broadcast Service</h1>
                        <p className="text-sm text-purple-200/60">
                            {isConnected ? '🟢 Connected' : '🔴 Disconnected'}
                            {!canSendMessage && ' • View Only (Admin/Superuser can broadcast)'}
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {isLoading ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-purple-200">Loading messages...</div>
                    </div>
                ) : messages[chatType]?.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center text-purple-200/60">
                            <p>No broadcasts yet</p>
                            <p className="text-sm mt-2">Admins can send broadcast messages</p>
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
                                Admin is typing...
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </>
                )}
            </div>

            <ChatInput
                onSendMessage={handleSendMessage}
                onTyping={handleTyping}
                disabled={!canSendMessage}
                placeholder={canSendMessage ? "Broadcast a message..." : "Only admins can broadcast messages"}
            />
        </div>
    );
}
