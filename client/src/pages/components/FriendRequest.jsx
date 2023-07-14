import {  Tabs } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'


const FriendRequest = ({ hidden }) => {
    const { req_sent, req_recd } = useSelector(state => state.user)
    console.log(req_recd,req_sent);

    const Nothing = () => {
        return <div className='min-h-[15vh] flex flex-col items-center justify-between '>
            <h2>No Requests here..</h2>
        </div>
    }

    const items = [
        {
            key: 1,
            label: 'Requests Sent',
            children:
                req_sent?.length > 0 ? req_sent.map((sender) => {
                    return <h1>{sender.username}</h1>
                }) :
                    <Nothing />
        },
        {
            key: 2,
            label: 'Requests Received',
            children:
            req_recd?.length>0? req_recd.map((receiver)=>{
                return <h1>{receiver.username}</h1>
            }):
                <Nothing/>
        }
    ]
    return (
        <div hidden={hidden} className=' fixed z-50  top-20 left-2 min-w-[30vw] min-h-[15vh] max-h-[100vh]    bg-[--sec]'>
            <Tabs className='text-[--text-h]  ' centered size='large' items={items} defaultActiveKey='1' />
        </div>
    )
}

export default FriendRequest
