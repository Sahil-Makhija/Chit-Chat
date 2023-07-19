import { createReducer } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const userReducer = createReducer(
    {
        isLoggedIn: false,
    },
    {
        LOGIN:(state,action)=>{
            return{
                ...state,
                ...action.payload,
                isLoggedIn:true
            }
        },
        LOGOUT:(state)=>{
            Cookies.set('token',null)
            return{
                ...state,
                isLoggedIn:false
            }
        }
    }
    )


export {userReducer}