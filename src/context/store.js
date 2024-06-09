import { configureStore } from "@reduxjs/toolkit";
import { authReducers as auth } from "./authSlice";
import {loaderReducers as loading} from "./loaderSlice";
export const store = configureStore({
	reducer: {
		auth,
		loading,
	},
});
