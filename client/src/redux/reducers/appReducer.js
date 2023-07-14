import { createReducer } from "@reduxjs/toolkit";

const appReducer = createReducer(
    {
        isLoading: false
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
        }
    },

)

export { appReducer }