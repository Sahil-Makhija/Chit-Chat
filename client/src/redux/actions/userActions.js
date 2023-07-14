//ToDO : Use DOtEnv

import axios from "axios"
import Cookies from "js-cookie"

export const ENDPOINT = 'http://127.0.0.1:4000'

export const signUp = async (dispatch, values) => {
    dispatch({ type: 'NOW_LOADING' })
    return await axios.post( ENDPOINT+'/user/create', values).then((response) => {
        const { data } = response
        if (data.status) {
            dispatch({
                type: 'LOGIN',
                payload: data.userData
            })
        }
        Cookies.set('token',data?.token,{expires:14})
        dispatch({ type: 'STOP_LOADING' })
        return data
    }).catch((error) => {
        dispatch({ type: 'STOP_LOADING' })
        return {
            status: false,
            error: error.message
        }
    })

}

export const login = async (dispatch, values) => {
    dispatch({ type: 'NOW_LOADING' })
    return await axios.post( ENDPOINT+'/user/get', values).then((response) => {
        const { data } = response
        if (data.status) {
            dispatch({
                type: 'LOGIN',
                payload: data?.userData
            })
            Cookies.set('token',data.token,{expires:14})
        }
        dispatch({ type: 'STOP_LOADING' })
        return data
    }).catch((error) => {
        dispatch({ type: 'STOP_LOADING' })
        return { status: false, error: error.message }
    })
}


export const handleFindFriends = async (email) => {
    if (email.length > 0) {
        return await axios.get( ENDPOINT+`/user/find?email_id=${email}`).then((response) => {
            return response.data
        }).catch((error) => { return error })
    }
    else {
        return {
            users: []
        }
    }
}

export const sendFriendRequest = async ( values) => {
    return await axios.post(ENDPOINT+ '/send/request', values).then((response) => {
        return response.data
    }).catch((error) => {
        return error
    })
}

export const fetchConnections = async(arr)=>{
    return await axios.post(ENDPOINT+'/fetch/connections',{connections:arr}).then((response)=>{
        return response.data
    })
}

export const handleFile = (file) =>{
    const form = new FormData()
    form.append('file',file)
    axios.post(ENDPOINT+'/file/upload',form,{
        headers: {
          "Content-Type": "multipart/form-data",
        }}).then((response)=>{
        console.log(response.data);
    }).catch((error)=>{
        console.log(error);
    })
}

export const fetchMessages = async(chatID)=>{
    return await axios.post(ENDPOINT+'/fetch/messages',{conversation_id:chatID}).then((response)=>{
        return response.data
    }).catch((error)=>{
        console.log(error);
        return []
    })
}