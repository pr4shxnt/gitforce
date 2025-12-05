import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface AdminAuthState {
    isAuthenticated: boolean;
    user: any | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
    otpSent: boolean;
    email: string | null;
}

const initialState: AdminAuthState = {
    isAuthenticated: false,
    user: null,
    token: null,
    isLoading: false,
    error: null,
    otpSent: false,
    email: null,
};


export const login = createAsyncThunk<
    any, // return type
    { password: string; email: string }, // argument type
    { rejectValue: string } // thunk API config
>(
    "adminAuth/login",
    async (formData: { password: string; email: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admin/login`, formData);
            return { ...response.data, email: formData.email };
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.message || error?.message || "Login failed");
        }
    }
)

export const verifyOtp = createAsyncThunk<
    any, // return type
    { email: string; otp: string }, // argument type
    { rejectValue: string } // thunk API config
>(
    "adminAuth/verifyOtp",
    async (formData: { email: string; otp: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admin/verify-otp`, formData);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.message || error?.message || "OTP verification failed");
        }
    }
)

const adminAuthSlice = createSlice({
    name: "adminAuth",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        resetOtpState: (state) => {
            state.otpSent = false;
            state.email = null;
            state.error = null;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
            state.error = null;
            state.otpSent = false;
            state.email = null;
            // Clear localStorage
            if (typeof window !== 'undefined') {
                localStorage.removeItem('adminAuth');
            }
        },
        setAuthFromStorage: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
        }
    },
    extraReducers: (builder) => {
        // Login (send OTP)
        builder.addCase(login.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.otpSent = true;
            state.email = action.payload.email;
            state.error = null;
        });
        builder.addCase(login.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload ?? null;
            state.otpSent = false;
        });

        // Verify OTP (complete authentication)
        builder.addCase(verifyOtp.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(verifyOtp.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user || action.payload;
            state.token = action.payload.token || action.payload.accessToken || null;
            state.otpSent = false;
            state.error = null;
            
            // Persist to localStorage
            if (typeof window !== 'undefined' && state.token) {
                localStorage.setItem('adminAuth', JSON.stringify({
                    user: state.user,
                    token: state.token
                }));
            }
        });
        builder.addCase(verifyOtp.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload ?? null;
        });
    },
});

export const { clearError, resetOtpState, logout, setAuthFromStorage } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
