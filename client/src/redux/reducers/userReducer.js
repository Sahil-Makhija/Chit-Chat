import { createReducer } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const userReducer = createReducer(
    {
        isLoggedIn: false,
    },
    {
        LOGIN:(state,action)=>{
            return{
                ...action.payload,
                isLoggedIn:true
            }
        },
        LOGOUT:()=>{
            Cookies.set('token',null)
            return{
                isLoggedIn:false
            }
        }
    }
    )


export {userReducer}