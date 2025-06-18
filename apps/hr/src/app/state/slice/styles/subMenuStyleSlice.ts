import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const defaultSubMenuStyle = 'Sidebar'; 

const initialState = {
    SubMenuStyle: defaultSubMenuStyle,
};

const subMenuStyleSlice = createSlice({
    name: 'SubMenuStyle',
    initialState,
    reducers: {
        setSubMenuStyle: (state, action: PayloadAction<string>) => {
            state.SubMenuStyle = action.payload;
            if (typeof window !== 'undefined') {
                localStorage.setItem('SubMenuStyle', action.payload);
            }
        },
        initializeSubMenuStyle: (state) => {
            if (typeof window !== 'undefined') {
                const storedStyle = localStorage.getItem('SubMenuStyle');
                if (storedStyle) {
                    state.SubMenuStyle = storedStyle; 
                }
            }
        },
    },
});

export const { setSubMenuStyle, initializeSubMenuStyle } = subMenuStyleSlice.actions;
export default subMenuStyleSlice.reducer;
