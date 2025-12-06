'use client'

interface Message {
    _id: string;
    sender: {
        _id: string;
        name: string;
        email: string;
        role: string;
    };
    message: string;
    attachments?: any[];
    createdAt: string;
}

interface ChatMessageProps {
    message: Message;
    isOwnMessage: boolean;
}

export default function ChatMessage({ message, isOwnMessage }: ChatMessageProps) {
    const formatTime = (timestamp: string) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    };

    const getRoleBadgeColor = (role: string) => {
        switch (role) {
            case 'admin':
                return 'from-red-500 to-orange-500';
            case 'superuser':
                return 'from-purple-500 to-pink-500';
            case 'moderator':
                return 'from-blue-500 to-cyan-500';
            default:
                return 'from-gray-500 to-gray-600';
        }
    };

    return (
        <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4`}>
            <div className={`max-w-[70%] ${isOwnMessage ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                {!isOwnMessage && (
                    <div className="flex items-center gap-2 px-2">
                        <span className="text-sm font-medium text-white">{message.sender.name}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full bg-gradient-to-r ${getRoleBadgeColor(message.sender.role)} text-white`}>
                            {message.sender.role}
                        </span>
                    </div>
                )}
                <div
                    className={`px-4 py-3 rounded-2xl ${
                        isOwnMessage
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-br-sm'
                            : 'bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-bl-sm'
                    }`}
                >
                    <p className="text-sm whitespace-pre-wrap break-words">{message.message}</p>
                    {message.attachments && message.attachments.length > 0 && (
                        <div className="mt-2 space-y-1">
                            {message.attachments.map((attachment, index) => (
                                <a 
                                    key={index} 
                                    href={attachment.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-xs opacity-80 hover:opacity-100 hover:underline transition-all"
                                >
                                    <span>📎</span>
                                    <span>{attachment.filename || 'Attachment'}</span>
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                </a>
                            ))}
                        </div>
                    )}
                </div>
                <span className="text-xs text-purple-200/60 px-2">{formatTime(message.createdAt)}</span>
            </div>
        </div>
    );
}
