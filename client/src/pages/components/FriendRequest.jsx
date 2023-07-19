import { Button, Card } from '@mui/material'
import { Tabs, Tooltip } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Img from './Image'
import { Check, Close } from '@mui/icons-material'
import { handleRequest, login } from '../../redux/actions/userActions'
import Cookies from 'js-cookie'



const FriendRequest = ({ hidden }) => {
    const dispatch = useDispatch()
    const { req_sent, req_recd } = useSelector(state => state.user)
    const { username, email } = useSelector(state => state.user)
    const handleResponse = async (response) => {
        handleRequest(response).then((res) => {
            if (res.status) {
                const token = Cookies.get('token')
                login(dispatch, { token })
            }
        })
    }

    const Nothing = () => {
        return <div className=' font-bold h-[10vh] flex flex-col items-center justify-center '>
            <h2>No Requests here..</h2>
        </div>
    }

    const RequestCard = ({ m }) => {
        return <Card variant='rectangular' className='  w-[100%] h-[10vmin] rounded-none'>
            <div className=' flex items-center p-3 space-x-3 bg-gray-300 h-[100%] relative '>
                <Img /><h1>{m?.username} sent you a friend request</h1>
                <div className='bg-[--prm] flex absolute bottom-1 right-1 rounded-md '>
                    <Tooltip title='accept'>
                        <Button onClick={() => {
                            handleResponse({ accepted: true, sender: m, receiver: { username, email } })
                        }} sx={{ color: 'white' }} >
                            <Check />
                        </Button>
                    </Tooltip>
                    <Tooltip title='reject'>
                        <Button onClick={() => {
                            handleResponse({ accepted: false, sender: m, receiver: { username, email } })
                        }} sx={{ color: 'white' }} >
                            <Close />
                        </Button>
                    </Tooltip>
                </div>
            </div>
        </Card>
    }

    const items = [
        {
            key: 1,
            label: 'Requests Sent',
            children:
                req_sent.length > 0 ? req_sent.map((r) => {
                    return (
                        <Card variant='rectangular' style={{ backgroundColor: 'var(--prm)', color: 'var(--text-h)' }} className='flex items-center justify-center w-[100%] h-[10vmin] rounded-none space-x-1'>
                            <span > You sent a friend request to</span> <h1 className='font-bold'>{' ' + r.username}</h1>
                        </Card>
                    )
                })
                    :
                    <Nothing />
        },
        {
            key: 2,
            label: 'Requests Received',
            children:
                req_recd?.length > 0 ? req_recd.map((m) => {
                    return <RequestCard m={m} />
                }) :
                    <Nothing />
        }
    ]
    return (
        <div hidden={hidden} className='p-2 fixed z-50  top-20 left-2 min-w-[30vw] min-h-[15vh] max-h-[100vh]   border-4 bg-[--sec] border-[--prm] rounded-md'>
            <Tabs className='text-[--text-h]  ' centered size='large' items={items} defaultActiveKey='1' />
        </div>
    )
}

export default FriendRequest
