// Mock Data for Admin Panel

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'member' | 'moderator';
  status: 'online' | 'offline' | 'away';
  lastSeen: Date;
}

export interface Message {
  id: string;
  userId: string;
  content: string;
  timestamp: Date;
  chatType: 'calendar' | 'general-meeting' | 'broadcast-service';
  reactions?: { emoji: string; count: number }[];
}

export interface ChatStats {
  type: 'calendar' | 'general-meeting' | 'broadcast-service';
  name: string;
  description: string;
  messageCount: number;
  activeUsers: number;
  lastActivity: Date;
  icon: string;
}

export interface DashboardStats {
  totalUsers: number;
  totalMessages: number;
  activeChats: number;
  avgResponseTime: string;
  userGrowth: number;
  messageGrowth: number;
}

export interface ActivityLog {
  id: string;
  userId: string;
  action: string;
  timestamp: Date;
  type: 'user' | 'message' | 'system';
}

export interface ChartData {
  label: string;
  value: number;
}

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Prashant Sharma',
    email: 'prashant@gitforce.com',
    avatar: '👨‍💻',
    role: 'admin',
    status: 'online',
    lastSeen: new Date(),
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@gitforce.com',
    avatar: '👩‍💼',
    role: 'moderator',
    status: 'online',
    lastSeen: new Date(),
  },
  {
    id: '3',
    name: 'Mike Chen',
    email: 'mike@gitforce.com',
    avatar: '👨‍🎨',
    role: 'member',
    status: 'away',
    lastSeen: new Date(Date.now() - 300000),
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily@gitforce.com',
    avatar: '👩‍🔬',
    role: 'member',
    status: 'online',
    lastSeen: new Date(),
  },
  {
    id: '5',
    name: 'Alex Kumar',
    email: 'alex@gitforce.com',
    avatar: '👨‍🚀',
    role: 'member',
    status: 'offline',
    lastSeen: new Date(Date.now() - 3600000),
  },
  {
    id: '6',
    name: 'Lisa Anderson',
    email: 'lisa@gitforce.com',
    avatar: '👩‍🎓',
    role: 'member',
    status: 'online',
    lastSeen: new Date(),
  },
];

// Mock Messages
export const mockMessages: Message[] = [
  {
    id: '1',
    userId: '1',
    content: 'Hey team! The sprint planning meeting is scheduled for tomorrow at 10 AM.',
    timestamp: new Date(Date.now() - 7200000),
    chatType: 'calendar',
    reactions: [{ emoji: '👍', count: 3 }],
  },
  {
    id: '2',
    userId: '2',
    content: 'Perfect! I\'ll prepare the agenda and share it before the meeting.',
    timestamp: new Date(Date.now() - 7000000),
    chatType: 'calendar',
  },
  {
    id: '3',
    userId: '3',
    content: 'Can we discuss the new feature requirements during the meeting?',
    timestamp: new Date(Date.now() - 6800000),
    chatType: 'calendar',
  },
  {
    id: '4',
    userId: '1',
    content: 'Welcome everyone to today\'s general meeting! Let\'s start with updates from each team.',
    timestamp: new Date(Date.now() - 5400000),
    chatType: 'general-meeting',
    reactions: [{ emoji: '👋', count: 5 }],
  },
  {
    id: '5',
    userId: '4',
    content: 'Development team has completed 80% of the Q4 roadmap items.',
    timestamp: new Date(Date.now() - 5200000),
    chatType: 'general-meeting',
  },
  {
    id: '6',
    userId: '5',
    content: 'Design team is working on the new UI components library.',
    timestamp: new Date(Date.now() - 5000000),
    chatType: 'general-meeting',
  },
  {
    id: '7',
    userId: '1',
    content: '🚨 IMPORTANT: System maintenance scheduled for this Saturday, 2 AM - 6 AM. Please save your work.',
    timestamp: new Date(Date.now() - 3600000),
    chatType: 'broadcast-service',
    reactions: [{ emoji: '✅', count: 12 }],
  },
  {
    id: '8',
    userId: '2',
    content: '📢 New security guidelines have been published. Please review them in the documentation.',
    timestamp: new Date(Date.now() - 1800000),
    chatType: 'broadcast-service',
  },
  {
    id: '9',
    userId: '6',
    content: 'Should we reschedule the code review session?',
    timestamp: new Date(Date.now() - 900000),
    chatType: 'calendar',
  },
  {
    id: '10',
    userId: '4',
    content: 'Great progress everyone! Keep up the excellent work! 🎉',
    timestamp: new Date(Date.now() - 600000),
    chatType: 'general-meeting',
    reactions: [{ emoji: '🎉', count: 8 }],
  },
];

// Chat Statistics
export const mockChatStats: ChatStats[] = [
  {
    type: 'calendar',
    name: 'Calendar & Events',
    description: 'Schedule meetings, events, and deadlines',
    messageCount: 156,
    activeUsers: 8,
    lastActivity: new Date(Date.now() - 900000),
    icon: '📅',
  },
  {
    type: 'general-meeting',
    name: 'General Meeting',
    description: 'Team discussions and updates',
    messageCount: 342,
    activeUsers: 12,
    lastActivity: new Date(Date.now() - 600000),
    icon: '💼',
  },
  {
    type: 'broadcast-service',
    name: 'Broadcast Service',
    description: 'Important announcements and updates',
    messageCount: 89,
    activeUsers: 24,
    lastActivity: new Date(Date.now() - 1800000),
    icon: '📢',
  },
];

// Dashboard Statistics
export const mockDashboardStats: DashboardStats = {
  totalUsers: 247,
  totalMessages: 1842,
  activeChats: 3,
  avgResponseTime: '2.3 min',
  userGrowth: 12.5,
  messageGrowth: 8.3,
};

// Activity Logs
export const mockActivityLogs: ActivityLog[] = [
  {
    id: '1',
    userId: '1',
    action: 'Created new broadcast message',
    timestamp: new Date(Date.now() - 3600000),
    type: 'message',
  },
  {
    id: '2',
    userId: '2',
    action: 'Updated meeting schedule',
    timestamp: new Date(Date.now() - 5400000),
    type: 'system',
  },
  {
    id: '3',
    userId: '4',
    action: 'Joined general meeting chat',
    timestamp: new Date(Date.now() - 7200000),
    type: 'user',
  },
  {
    id: '4',
    userId: '3',
    action: 'Sent message in calendar chat',
    timestamp: new Date(Date.now() - 9000000),
    type: 'message',
  },
  {
    id: '5',
    userId: '6',
    action: 'Updated profile information',
    timestamp: new Date(Date.now() - 10800000),
    type: 'user',
  },
  {
    id: '6',
    userId: '5',
    action: 'System backup completed',
    timestamp: new Date(Date.now() - 14400000),
    type: 'system',
  },
];

// User Growth Chart Data (Last 7 days)
export const mockUserGrowthData: ChartData[] = [
  { label: 'Mon', value: 210 },
  { label: 'Tue', value: 218 },
  { label: 'Wed', value: 225 },
  { label: 'Thu', value: 232 },
  { label: 'Fri', value: 238 },
  { label: 'Sat', value: 242 },
  { label: 'Sun', value: 247 },
];

// Message Volume Chart Data (By Chat Type)
export const mockMessageVolumeData: ChartData[] = [
  { label: 'Calendar', value: 156 },
  { label: 'Meeting', value: 342 },
  { label: 'Broadcast', value: 89 },
];

// Helper function to get user by ID
export const getUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id);
};

// Helper function to get messages by chat type
export const getMessagesByChatType = (chatType: 'calendar' | 'general-meeting' | 'broadcast-service'): Message[] => {
  return mockMessages.filter(msg => msg.chatType === chatType);
};

// Helper function to format relative time
export const getRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
};
