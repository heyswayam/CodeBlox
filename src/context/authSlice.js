import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
    status: JSON.parse(localStorage.getItem('authStatus')) || false,
    userData: JSON.parse(localStorage.getItem('userData')) || null
};

const authSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload;
            localStorage.setItem('authStatus', JSON.stringify(true));
            localStorage.setItem('userData', JSON.stringify(action.payload));
            console.log("payload" + action.payload);
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
            localStorage.removeItem('authStatus');
            localStorage.removeItem('userData');
        }
    }
});

export const { login, logout } = authSlice.actions;
export const authReducers = authSlice.reducer;