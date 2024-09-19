import {createSlice } from '@reduxjs/toolkit';
const initialState = {
    mode: localStorage.getItem('theme') || 'dark'
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (state, action) => {
            state.mode = action.payload;
            localStorage.setItem('theme', action.payload); // Save theme to localStorage
        }
    }
});

export const {setTheme} = themeSlice.actions;
export const themeReducers = themeSlice.reducer
