import { Add, Group, Menu, Notifications, Search } from '@mui/icons-material'
import { Badge, Button, Card, Skeleton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Img from './Image'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Drawer, Image } from 'antd'
import skl_image from '../../assets/blank.webp'
import FriendRequest from './FriendRequest'
import { fetchConnections } from '../../redux/actions/userActions'
import { leaveRoom } from '../../ChatConfig'


const NavDrawer = () => {
    const dispatch = useDispatch()
    const [drawer, setDrawer] = useState(false)
    const [requests, setRequests] = useState(true)
    const [chats, setChats] = useState([])
    const { username, email, conversations } = useSelector(state => state.user)
    const {_id} = useSelector(state=>state.chat)

    useEffect(() => {
        const setConnections = async () => {
            await fetchConnections(conversations).then(({ connections }) => {
                setChats([...connections.filter((c) => {
                    return c?.status === false ? false : true
                })])
            })
        }
        setConnections()
    }, [conversations])


    const navigate = useNavigate()
    const loading = false

    return (
        <div className='nav-drawer'>
            <FriendRequest hidden={requests} />
            <div className='flex justify-between items-center m-2 ' >
                <div className='flex items-center space-x-3'>
                    <Img />
                    <h2>{username}</h2>

                </div>
                <div className='flex  '>
                    <Button onClick={() => navigate('/user/find')} >
                        <Add sx={{ color: 'white' }} />
                    </Button>
                    <Button onClick={() => { setRequests(!requests) }}  >
                        <Group sx={{ color: 'white' }} />
                    </Button>
                    <Button>
                        <Badge badgeContent={0} color='primary' >
                            <Notifications sx={{ color: 'white' }} />
                        </Badge>
                    </Button>
                    <Button onClick={() => setDrawer(true)} >
                        <Menu sx={{ color: 'white' }} />
                    </Button>
                </div>

            </div>
            <Drawer style={{ width: '31vw', backgroundColor: '#0f0f0f99' }} open={drawer} onClose={() => setDrawer(false)} placement='left' >
                <div className="flex flex-col h-full w-full  items-center space-y-5  text-white">
                    <Image className='  rounded-[50%] max-h-[20vh]' src={skl_image} />
                    <div className='space-x-2 flex justify-center items-center flex-col'>
                        <h2 className='font-bold text-[--text-h] text-[3vmin]'>{username}</h2>
                        <h4 className='text-[--text]'>{email}</h4>
                    </div>
                    <Button className='font-sc text-xl px-2 py-1' onClick={() => {
                        dispatch({ type: "DESELECT_CHAT" })
                        dispatch({ type: "LOGOUT" })
                    }} >LOGOUT</Button>
                </div>

            </Drawer>
            <div className='flex bg-[--sec] items-center  focus:outline-none h-[5vh]  rounded-md px-2 space-x-2 relative'>
                <Search />
                <input spellCheck='false' className='bg-transparent placeholder:text-[--text] focus:outline-none text-white p-2 h-[80%]' autoCorrect='off' placeholder='search' />
            </div>
            <div className='overflow-y-scroll flex flex-col items-center justify-center '>
                {chats?.length === 0 ?
                    <div className='flex flex-col space-y-5'>
                        <h1 className='text-[--text] text-[20px] '>You have 0 connections</h1>
                        <Button onClick={() => navigate('/user/find')} >
                            <Add sx={{ color: 'white' }} />
                            <h1 className='font-sc font-bold text-[--text-h] '>Add friends</h1>
                        </Button>
                    </div>
                    :
                    chats?.map((chat) => {
                        if (chat?.status === false) { return null }
                        return (<Card onClick={() => {
                            if(_id){
                                leaveRoom(_id)
                            }
                            dispatch({
                                type: 'SELECT_CHAT',
                                payload: { ...chat, username, email,chatName: (chat?.members.filter((m)=>{
                                    return true ? m.email !== email :false
                                })[0]?.username) }
                            })
                        }} variant='rectangular' className='  w-[100%] h-[10vmin] rounded-none'>
                            {loading && (<Skeleton width={'100%'} height={'100%'} variant='rounded' />)}
                            {!loading && (
                                <div className='contact-card '>
                                    <Badge badgeContent={0} color='success'>
                                        <Img />
                                    </Badge>
                                    <div className="flex flex-col  ">
                                        <h2 className='text-[--text-h]'>{chat?.GroupName || (chat?.members.filter((m)=>{
                                    return true ? m.email !== email :false
                                })[0]?.username)}</h2>
                                        <span className='text-[2vmin] text-[--text] ' >{chat?.lastMessage || null}</span>
                                    </div>
                                </div>
                            )}
                        </Card>)
                    })}
            </div>
        </div>

    )
}

export default NavDrawer
