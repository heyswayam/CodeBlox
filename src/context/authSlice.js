import {createSlice, nanoid } from '@reduxjs/toolkit';
const initialState = {
    status : false,
    userData : null
}

const authSlice = createSlice({
    name: "authentication",
    initialState,
    reducers:{
        login: (state,action)=>{
            state.status = true;
            state.userData=action.payload
            
            console.log("payload" + action.payload);
        },
        logout:(state)=>{
            state.status=false;
            state.userData=null;
        }
    }
})

export const {login,logout} = authSlice.actions;
export const authReducers = authSlice.reducer