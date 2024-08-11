import {createSlice } from '@reduxjs/toolkit';
const initialState = {
    loader : false
}

const loaderSlice = createSlice({
    name: "loader",
    initialState,
    reducers:{
        setLoader: (state,action)=>{
            state.loader = action.payload
        }
    }
})

export const {setLoader} = loaderSlice.actions;
export const loaderReducers = loaderSlice.reducer