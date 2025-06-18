import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
    user_id: number,
    employee_id: number,
    employee_no: string,
    email: string,
    first_name: string,
    middle_name: string,
    last_name: string,
    role: string,
    position: string,
    user_location: string,
    picture: string,
}

const initialState: UserState = {
    user_id: 0,
    employee_id: 0,
    employee_no: '',
    email: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    role: '',
    position: '',
    user_location: '',
    picture: '',
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            return action.payload;
        },
        clearUser: () => initialState,
    },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
