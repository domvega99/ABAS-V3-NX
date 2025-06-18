import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from './userSlice';

export interface AuthState {
  user: UserState | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: '[Authentication API]',
    initialState,
    reducers: {
        loginRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action: PayloadAction<any>) => {
            state.user = action.payload; 
            state.token = action.payload.token;
            state.isAuthenticated = true;
            state.loading = false;
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.error = null;
        },
        loadCurrentUser: (state, action: PayloadAction<any>) => {
            state.user = action.payload; 
            state.token = action.payload.token;
            state.isAuthenticated = true;
            state.loading = false;
        },
    },
});

export const { loginRequest, loginSuccess, loginFailure, logout, loadCurrentUser } = authSlice.actions;

export default authSlice.reducer;
