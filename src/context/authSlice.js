import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
    status: JSON.parse(localStorage.getItem('authStatus')) || false,
    userData: null,
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

        },
        updateName: (state,action)=>{
            state.userData.name=action.payload;
        }
    }
});

export const { login, logout,updateName } = authSlice.actions;
export const authReducers = authSlice.reducer;