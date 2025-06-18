import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slice/userSlice'
import authReducer from './slice/authSlice'
import menuStyleReducer from './slice/styles/menuStyleSlice'
import subMenuStyleReducer from './slice/styles/subMenuStyleSlice'
import departmentReducer from './slice/departmentSlice'

const store = configureStore({
    reducer: {
        user: userReducer,
        auth: authReducer,
        menuStyle: menuStyleReducer,
        subMenuStyle: subMenuStyleReducer,
        departments: departmentReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
