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

export const fetchUserData = createAsyncThunk<
    any, // return type
    string, // token argument
    { rejectValue: string } // thunk API config
>(
    "adminAuth/fetchUserData",
    async (token: string, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/me`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.message || error?.message || "Failed to fetch user data");
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
                localStorage.removeItem('admin_session');
            }
        },
        setAuthFromStorage: (state, action) => {
            state.token = action.payload.token;
            state.isAuthenticated = true;
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

        // Verify OTP (get token)
        builder.addCase(verifyOtp.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(verifyOtp.fulfilled, (state, action) => {
            state.isLoading = false;
            state.token = action.payload.token;
            state.isAuthenticated = true; // Set authenticated immediately
            state.otpSent = false;
            state.error = null;
            
            // Persist only token to localStorage
            if (typeof window !== 'undefined' && state.token) {
                localStorage.setItem('admin_session', JSON.stringify({
                    token: state.token
                }));
            }
        });
        builder.addCase(verifyOtp.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload ?? null;
        });

        // Fetch user data
        builder.addCase(fetchUserData.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchUserData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
        });
        builder.addCase(fetchUserData.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload ?? null;
            // If fetching user fails, clear auth
            state.isAuthenticated = false;
            state.token = null;
            if (typeof window !== 'undefined') {
                localStorage.removeItem('admin_session');
            }
        });
    },
});

export const { clearError, resetOtpState, logout, setAuthFromStorage } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
