import React, { useEffect, useState } from 'react'
import ImageIcon from './Image'
import { Menu } from '@mui/icons-material'
import { Button, Card } from '@mui/material'
import { Drawer, Image } from 'antd'
import skl_image from '../../assets/blank.webp'
import SenderMsg from './SenderMsg'
import RecdMsg from './RecdMsg'
import { useSelector } from 'react-redux'
import InputField from './InputField'
import Img from './Image'
import { fetchMessages } from '../../redux/actions/userActions'



const { socket } = require('../../ChatConfig')
const MessageSpace = () => {
    const { email } = useSelector(state => state.user)
    const { GroupName, isGroup, members ,chatName ,_id } = useSelector(state => state.chat)

    socket.on('message', (msg) => {
        setMessages([...messages, msg])
    })



    const [messages, setMessages] = useState([])

    useEffect(()=>{
        const getMessages = async()=>{
            setMessages(await fetchMessages(_id))
        }
        getMessages()
    },[_id])
    const [drawer, setDrawer] = useState(false)
    return (
        <section className='w-[69vw] bg-[--sec] h-[100vh] fixed right-0 top-0 flex justify-center items-center' >
            <div className='w-[99%] h-[98%] bg-[--prm] flex flex-col   rounded-xl relative'>
                <nav className=' h-[10vmin] w-[100%] bg-[--sec] flex p-3 items-center justify-between'  >
                    <div className='bg-[--sec] flex justify-between items-center space-x-3'>
                        <ImageIcon />
                        <h2 className='text-[--text-h] font-sc font-bold text-xl '>{GroupName || chatName}</h2>
                    </div>
                    <div className='space-x-3 flex items-center'>
                        <h2 className='text-[--text-h]'>{null}</h2>
                        <Button onClick={() => setDrawer(true)}>
                            <Menu sx={{ color: 'white' }} />
                        </Button>
                    </div>
                </nav>
                <div className='w-full   overflow-y-scroll' >
                    {messages.map((m) => {
                        if (m?.sender?.email === email) {
                            return <SenderMsg msg={m} />
                        }
                        else {
                            return <RecdMsg msg={m} />
                        }
                    })}
                </div>
                <InputField />

            </div>
            <Drawer onClose={() => setDrawer(false)} style={{ backgroundColor: '#ffffff10', overflowX: 'hidden', position: 'relative' }} placement='right' open={drawer} >
                <div className="flex flex-col h-full w-full  items-center space-y-5  text-[--text-h]">
                    <Image className='rounded-[50%] max-h-[20vh] ' src={skl_image} />
                    <div className='space-x-2 flex justify-center items-center flex-col'>
                        <h2 className='font-bold font-sc text-[--text-h] text-[3vmin]'>#Global Chat</h2>
                    </div>
                    {isGroup && (<div className='w-[95%] max-h-[50%] overflow-y-scroll p-2 space-y-2'>
                        <h2 className='font-ubuntu text-xl font-bold ' >Members</h2>
                        <ul >
                            {members.map((m, i) => {
                                return (
                                    <Card variant='rectangular' className='  w-[100%] h-[10vmin] rounded-none'>
                                        <div className='contact-card  '>
                                            <Img />
                                            <div className="flex flex-col  ">
                                                <h2 className='text-[--text-h]'>{m.username || `User ${i + 1}`}</h2>
                                                <span className='text-[2vmin] text-[--text] ' >{m.email || null}</span>
                                            </div>
                                        </div>
                                    </Card>
                                )
                            })}
                        </ul>
                    </div>)}
                </div>
            </Drawer>
        </section>
    )
}

export default MessageSpace
