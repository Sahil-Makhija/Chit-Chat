import { configureStore } from "@reduxjs/toolkit";
import { appReducer } from "./reducers/appReducer";
import { userReducer } from "./reducers/userReducer";
import chatReducer from "./reducers/chatReducer";

export const store = configureStore({
    reducer:{
        app:appReducer,
        user:userReducer,
        chat:chatReducer
    }
})