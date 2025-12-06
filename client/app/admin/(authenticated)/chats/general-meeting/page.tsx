'use client'

import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { fetchMessages, addMessage, setConnected, setTypingUser } from '@/lib/ChatSlice';
import socketService from '@/lib/socket.service';
import ChatMessage from '@/components/admin/ChatMessage';
import ChatInput from '@/components/admin/ChatInput';

export default function GeneralMeetingChatPage() {
    const dispatch = useAppDispatch();
    const { token, user } = useAppSelector((state) => state.adminAuth);
    const { messages, isConnected, typingUsers } = useAppSelector((state) => state.chat);
    const [isLoading, setIsLoading] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatType = 'general-meeting';

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
        socketService.sendMessage(chatType, message);
    };

    const handleTyping = (isTyping: boolean) => {
        socketService.sendTyping(chatType, isTyping);
    };

    return (
        <div className="flex flex-col h-screen">
            <div className="p-6 border-b border-white/10 bg-white/5 backdrop-blur-xl">
                <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">👥 General Meeting</h1>
                        <p className="text-sm text-purple-200/60">
                            {isConnected ? '🟢 Connected' : '🔴 Disconnected'} • Everyone can send messages
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

            <ChatInput
                onSendMessage={handleSendMessage}
                onTyping={handleTyping}
                placeholder="Type a message..."
            />
        </div>
    );
}
