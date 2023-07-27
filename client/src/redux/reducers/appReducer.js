import { createReducer } from "@reduxjs/toolkit";

const appReducer = createReducer(
    {
        isLoading: false,
        notifications:[]
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
            return {...state,notifications:[...notifications,action.payload]}
        }
    },

)

export { appReducer }