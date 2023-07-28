import React from 'react'
import { joinUser } from '../../ChatConfig'
import { Badge, Card ,Img} from '../ExtComponents'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const ContactCard = ({ chat }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { _id } = useSelector(state => state.chat)
    const { email } = useSelector(state => state.user)
    joinUser(chat?._id)
    
    
    let CHAT = chat?.members.filter((m) => {
        return true ? m.email !== email : false
    })[0]
    return (
        <Card onClick={() => {
            navigate('/user/chat')
            dispatch({
                type: 'SELECT_CHAT',
                payload: { ...chat, chatName: CHAT?.username, chatEmail: CHAT?.email }
            })
        }} variant='rectangular' className='  w-[100%] h-16 rounded-none mb-1'>
            {/* {loading && (<Skeleton width={'100%'} height={'100%'} variant='rounded' />)} */}
            <div className={`contact-card ${_id === chat._id ? 'bg-[--sec]' : 'bg-[--prm]'}  `} >
                <Badge badgeContent={0} color='success'>
                    <Img />
                </Badge>
                <div className="flex flex-col  ">
                    <h2 className='text-[--text-h] text-lg '>{chat?.GroupName || CHAT?.username}</h2>
                    <span className='text-sm text-[--text] ' >{chat?.lastMessage || null}</span>
                </div>
            </div>
        </Card>
    )
}

export default ContactCard
