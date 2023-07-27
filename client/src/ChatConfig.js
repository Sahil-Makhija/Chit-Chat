import io from 'socket.io-client'
import { ENDPOINT } from './redux/actions/userActions'

const socket = io(ENDPOINT)

const joinUser = (room)=>{
    socket.emit('user-join',room)
}

const sendMessage = (room,msg)=>{
    socket.emit('message',{room,msg})
}

const leaveRoom = (room)=>{
    socket.emit('user-left',room)
}

const isTyping = ({room,username})=>{
    socket.emit('user-typing',{room,username})
}

const stopTyping = ({room,username})=>{
    socket.emit('user-stopTyping',{room,username})
}

export {socket, joinUser , sendMessage,leaveRoom , isTyping,stopTyping}