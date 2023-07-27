import React, { useEffect, useState } from 'react'
import { joinUser, socket } from '../../ChatConfig'
import { Badge, Card ,Img} from '../ExtComponents'
import { useDispatch, useSelector } from 'react-redux'


const ContactCard = ({ chat }) => {
    const [incomingMessage,setIncomingMessage] =useState(undefined)
    const dispatch = useDispatch()
    const { _id } = useSelector(state => state.chat)
    const { email } = useSelector(state => state.user)
    joinUser(chat?._id)
    socket.on('message',(msg)=>{
        setIncomingMessage(msg)
    })
    useEffect(()=>{
        if(incomingMessage){
            let {conversation_id} = incomingMessage
            if(conversation_id!== _id){
                dispatch({type:'NEW_NOTIFICATION',payload:incomingMessage})
            }
        }
    },[incomingMessage])
    let CHAT = chat?.members.filter((m) => {
        return true ? m.email !== email : false
    })[0]
    return (
        <Card onClick={() => {
            dispatch({
                type: 'SELECT_CHAT',
                payload: { ...chat, chatName: CHAT?.username, chatEmail: CHAT?.email }
            })
        }} variant='rectangular' className='  w-[100%] h-[10vmin] rounded-none'>
            {/* {loading && (<Skeleton width={'100%'} height={'100%'} variant='rounded' />)} */}
            <div className={`contact-card ${_id === chat._id ? 'bg-[--sec]' : 'bg-[--prm]'}  `} >
                <Badge badgeContent={0} color='success'>
                    <Img />
                </Badge>
                <div className="flex flex-col  ">
                    <h2 className='text-[--text-h]'>{chat?.GroupName || CHAT?.username}</h2>
                    <span className='text-[2vmin] text-[--text] ' >{chat?.lastMessage || null}</span>
                </div>
            </div>
        </Card>
    )
}

export default ContactCard
