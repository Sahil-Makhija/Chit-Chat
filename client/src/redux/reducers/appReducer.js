import { createReducer } from "@reduxjs/toolkit";

const appReducer = createReducer(
    {
        isLoading: false,
        notifications: [],
        incomingMessage: {}
    },
    {
        NOW_LOADING: (state) => {
            return {
                ...state,
                isLoading: true
            }
        },
        STOP_LOADING: (state) => {
            return {
                ...state,
                isLoading: false
            }
        },
        NEW_NOTIFICATION: (state, action) => {
            const { notifications } = state
            console.log(action.payload);
            if (notifications.indexOf(action.payload) === -1){
                return { ...state, notifications: [...notifications, action.payload] }
            }
        },
        NEW_MESSAGE: (state, action) => {
            console.log(action.payload);
            return { ...state, incomingMessage: action.payload }
        }
    },

)

export { appReducer }