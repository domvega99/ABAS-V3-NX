import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slice/userSlice'
import authReducer from './slice/authSlice'

const store = configureStore({
    reducer: {
        user: userReducer,
        auth: authReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };
export default store;
