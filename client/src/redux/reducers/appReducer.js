import { createReducer } from "@reduxjs/toolkit";

const appReducer = createReducer(
    {
        isLoading: false,
        notifications:0
    },
    {
        NOW_LOADING: (state) => {
            return {
                ...state,
                isLoading:true
            }
        },
        STOP_LOADING:(state)=>{
            return {
                ...state,
                isLoading:false
            }
        },
        NEW_NOTIFICATION:(state,action)=>{
            const {notifications} = state
            return {...state,notifications:notifications+1}
        }
    },

)

export { appReducer }