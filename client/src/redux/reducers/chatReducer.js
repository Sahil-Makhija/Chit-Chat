import { createReducer } from "@reduxjs/toolkit";


const chatReducer = createReducer(
    {
        isChatSelected:false
    },
    {
        SELECT_CHAT:(state,action)=>{
            return {...state,isChatSelected:true,...action.payload}
        },
        DESELECT_CHAT:(state)=>{
            return {...state,isChatSelected:false}
        }
    }
)

export  {chatReducer} 