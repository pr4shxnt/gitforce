import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import adminAuthReducer from "./AdminAuthSlice";
import chatReducer from "./ChatSlice";

export const store = configureStore({
  reducer: {        
    adminAuth: adminAuthReducer,
    auth: authReducer,
    chat: chatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
