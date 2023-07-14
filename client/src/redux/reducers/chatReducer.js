import { createReducer } from "@reduxjs/toolkit";
import { joinUser } from "../../ChatConfig";


const chatReducer = createReducer(
    {
        isChatSelected:false
    },
    {
        SELECT_CHAT:(state,action)=>{
            const {_id , username,email} = action.payload
            joinUser(_id,{username,email})
            return {isChatSelected:true,...action.payload}
        },
        DESELECT_CHAT:()=>{
            return {isChatSelected:false}
        }
    }
)

export default chatReducer 