import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const defaultMenuStyle = 'MiddleMainMenu'; 

const initialState = {
    menuStyle: defaultMenuStyle,
};

const menuStyleSlice = createSlice({
    name: 'menuStyle',
    initialState,
    reducers: {
        setMenuStyle: (state, action: PayloadAction<string>) => {
            state.menuStyle = action.payload;
            if (typeof window !== 'undefined') {
                localStorage.setItem('menuStyle', action.payload);
            }
        },
        initializeMenuStyle: (state) => {
            if (typeof window !== 'undefined') {
                const storedStyle = localStorage.getItem('menuStyle');
                if (storedStyle) {
                    state.menuStyle = storedStyle; 
                }
            }
        },
    },
});

export const { setMenuStyle, initializeMenuStyle } = menuStyleSlice.actions;
export default menuStyleSlice.reducer;
