import { createReducer } from "@reduxjs/toolkit";


const chatReducer = createReducer(
    {
        isChatSelected:false
    },
    {
        SELECT_CHAT:(state,action)=>{
            return {isChatSelected:true,...action.payload}
        },
        DESELECT_CHAT:()=>{
            return {isChatSelected:false}
        }
    }
)

export  {chatReducer} 