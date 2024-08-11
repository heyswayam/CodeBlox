import { combineReducers } from "@reduxjs/toolkit";
import { authReducers as auth } from "./authSlice";
import { loaderReducers as loading } from "./loaderSlice";
import { themeReducers as theme } from "./themeSlice";
export default combineReducers({
    auth: auth,
    loading: loading,
    theme: theme,
})