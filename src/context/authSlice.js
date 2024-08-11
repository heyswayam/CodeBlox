import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
    status: JSON.parse(localStorage.getItem('authStatus')) || false,
};

const authSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload;

        },
        logout: (state) => {
            state.status = false;
            state.userData = null;

        }
    }
});

export const { login, logout } = authSlice.actions;
export const authReducers = authSlice.reducer;