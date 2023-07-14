import { Tabs } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'

const FriendRequest = ({hidden}) => {
    const {req_sent,req_recd} = useSelector(state=>state.user)
    const items = [
        {
            key: 1,
            label: 'Requests Sent',
            children:
                <div className='min-h-[15vh] flex flex-col items-center justify-between '>
                    <h2>No Requests here..</h2>
                </div>
        },
        {
            key: 2,
            label: 'Requests Received',
            children:
                <div className='min-h-[15vh] flex flex-col items-center justify-between '>
                    <h2>No Requests here..</h2>
                </div>
        }
    ]
    return (
        <div hidden={hidden} className=' fixed z-50  top-20 left-2 min-w-[30vw] min-h-[15vh] max-h-[100vh]    bg-[--sec]'>
            <Tabs className='text-[--text-h]  ' centered size='large' items={items} defaultActiveKey='1' />
        </div>
    )
}

export default FriendRequest
