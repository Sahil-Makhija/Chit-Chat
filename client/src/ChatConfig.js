import io from 'socket.io-client'
import { ENDPOINT } from './redux/actions/userActions'

const socket = io(ENDPOINT)

const joinUser = (room,userData)=>{
    socket.emit('user-join',room,userData)
}

 const sendMessage = (room,msg)=>{
    socket.emit('message',room,msg)
}

const leaveRoom = (room)=>{
    socket.emit('user-left',room)
}

export {socket, joinUser , sendMessage,leaveRoom}