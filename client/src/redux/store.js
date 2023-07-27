import { configureStore } from "@reduxjs/toolkit";
import {appReducer,chatReducer,userReducer} from './reducers'

export const store = configureStore({
    reducer:{
        app:appReducer,
        user:userReducer,
        chat:chatReducer
    }
})