import { configureStore } from "@reduxjs/toolkit";
// import { combineReducers } from "@reduxjs/toolkit";
import { authReducers } from "./authSlice";
import { loaderReducers  } from "./loaderSlice";
import combineReducer from "./combineReducer";
export const store = configureStore({
	reducer:combineReducer
});
