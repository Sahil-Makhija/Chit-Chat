import { Add, Group, Menu, Notifications, Search, skl_image } from '../icons'
import { Badge, Button, Img, Drawer, Image } from '../ExtComponents'
import { FriendRequest, ContactCard } from '../../pages'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchConnections } from '../../redux/actions/userActions'


const NavDrawer = () => {
    const dispatch = useDispatch()
    const [drawer, setDrawer] = useState(false)
    const [requests, setRequests] = useState(true)
    const [chats, setChats] = useState([])
    const { username, email, conversations } = useSelector(state => state.user)
    const { notifications } = useSelector(state => state.app)

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
    return (
        <div className={`nav-drawer`}>
            <FriendRequest hidden={requests} />
            <div className='flex justify-between items-center m-2  ' >
                <div className='flex items-center space-x-3'>
                    <Img />
                    <h2 className='text-lg' >{username}</h2>

                </div>
                <div className='flex  '>
                    <div className='hide flex  ' >
                        <Button onClick={() => navigate('/user/find')} >
                            <Add sx={{ color: 'white' }} />
                        </Button>
                        <Button onClick={() => { setRequests(!requests) }}  >
                            <Group sx={{ color: 'white' }} />
                        </Button>
                        <Button>
                            <Badge badgeContent={notifications?.length} color='primary' >
                                <Notifications sx={{ color: 'white' }} />
                            </Badge>
                        </Button>
                    </div>
                    <Button onClick={() => setDrawer(true)} >
                        <Menu sx={{ color: 'white' }} />
                    </Button>
                </div>

            </div>
            <Drawer style={{ backgroundColor: '#0f0f0f99' }} open={drawer} onClose={() => setDrawer(false)} placement='left' >
                <div className="flex flex-col h-full w-full  items-center space-y-5  text-white">
                    <Image className='  rounded-[50%] max-h-24' src={skl_image} />
                    <div className='space-x-2 flex justify-center items-center flex-col'>
                        <h2 className='font-bold text-[--text-h] text-2xl'>{username}</h2>
                        <h4 className='text-[--text] text-lg'>{email}</h4>
                    </div>
                    <Button className='font-sc text-xl gont-bold px-2 py-1' onClick={() => {
                        dispatch({ type: "DESELECT_CHAT" })
                        dispatch({ type: "LOGOUT" })
                    }} >LOGOUT</Button>
                </div>

            </Drawer>
            <div className='flex bg-[--sec] items-center  focus:outline-none h-10  rounded-md px-2 space-x-2 relative'>
                <Search />
                <input spellCheck='false' className='bg-transparent placeholder:text-[--text] focus:outline-none text-white p-2 h-[80%]' autoCorrect='off' placeholder='search' />
            </div>
            <div className='overflow-y-scroll flex flex-col items-center justify-center '>
                {chats?.length === 0 ?
                    <div className='flex flex-col space-y-5'>
                        <h1 className='text-[--text] text-xl '>You have 0 connections</h1>
                        <Button onClick={() => navigate('/user/find')} >
                            <Add sx={{ color: 'white' }} />
                            <h1 className='font-sc font-bold text-[--text-h] '>Add friends</h1>
                        </Button>
                    </div>
                    :
                    chats?.map((chat) => {
                        if (chat?.status === false) { return null }
                        return (<ContactCard chat={chat} />)
                    })}
            </div>
        </div>
    )
}

export default NavDrawer
