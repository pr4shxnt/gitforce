'use client'

import { useState, FormEvent } from 'react';

interface ChatInputProps {
    onSendMessage: (message: string) => void;
    onTyping?: (isTyping: boolean) => void;
    disabled?: boolean;
    placeholder?: string;
}

export default function ChatInput({ onSendMessage, onTyping, disabled, placeholder }: ChatInputProps) {
    const [message, setMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (message.trim() && !disabled) {
            onSendMessage(message.trim());
            setMessage('');
            if (onTyping) {
                onTyping(false);
                setIsTyping(false);
            }
        }
    };

    const handleChange = (value: string) => {
        setMessage(value);
        
        if (onTyping) {
            if (value.length > 0 && !isTyping) {
                onTyping(true);
                setIsTyping(true);
            } else if (value.length === 0 && isTyping) {
                onTyping(false);
                setIsTyping(false);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border-t border-white/10 bg-white/5 backdrop-blur-xl">
            <div className="flex gap-3">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => handleChange(e.target.value)}
                    disabled={disabled}
                    placeholder={placeholder || "Type a message..."}
                    className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button
                    type="submit"
                    disabled={!message.trim() || disabled}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    <span>Send</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                </button>
            </div>
        </form>
    );
}
