import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

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

interface ChatState {
    messages: {
        [chatType: string]: Message[];
    };
    isConnected: boolean;
    isLoading: boolean;
    error: string | null;
    typingUsers: {
        [chatType: string]: string[];
    };
}

const initialState: ChatState = {
    messages: {
        'calendar': [],
        'general-meeting': [],
        'broadcast-service': []
    },
    isConnected: false,
    isLoading: false,
    error: null,
    typingUsers: {}
};

export const fetchMessages = createAsyncThunk<
    { chatType: string; messages: Message[] },
    { chatType: string; token: string },
    { rejectValue: string }
>(
    'chat/fetchMessages',
    async ({ chatType, token }, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/messages/${chatType}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            return { chatType, messages: response.data };
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.message || 'Failed to fetch messages');
        }
    }
);

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setConnected: (state, action: PayloadAction<boolean>) => {
            state.isConnected = action.payload;
        },
        addMessage: (state, action: PayloadAction<{ chatType: string; message: Message }>) => {
            const { chatType, message } = action.payload;
            if (!state.messages[chatType]) {
                state.messages[chatType] = [];
            }
            state.messages[chatType].push(message);
        },
        setTypingUser: (state, action: PayloadAction<{ chatType: string; userId: string; isTyping: boolean }>) => {
            const { chatType, userId, isTyping } = action.payload;
            if (!state.typingUsers[chatType]) {
                state.typingUsers[chatType] = [];
            }
            if (isTyping) {
                if (!state.typingUsers[chatType].includes(userId)) {
                    state.typingUsers[chatType].push(userId);
                }
            } else {
                state.typingUsers[chatType] = state.typingUsers[chatType].filter(id => id !== userId);
            }
        },
        clearMessages: (state, action: PayloadAction<string>) => {
            state.messages[action.payload] = [];
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMessages.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(fetchMessages.fulfilled, (state, action) => {
            state.isLoading = false;
            state.messages[action.payload.chatType] = action.payload.messages;
        });
        builder.addCase(fetchMessages.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload ?? null;
        });
    }
});

export const { setConnected, addMessage, setTypingUser, clearMessages, clearError } = chatSlice.actions;
export default chatSlice.reducer;
