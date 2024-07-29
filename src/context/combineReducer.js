import { combineReducers } from "@reduxjs/toolkit";
import { authReducers as auth } from "./authSlice";
import { loaderReducers as loading } from "./loaderSlice";

export default combineReducers({
    auth: auth,
    loading: loading,
})