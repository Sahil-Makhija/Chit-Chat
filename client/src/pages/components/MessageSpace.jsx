import React, { useEffect, useState } from 'react'
import { Menu, skl_image } from '../icons'
import { Button, Card, Drawer, Image, Img } from '../ExtComponents'
import { useSelector } from 'react-redux'
import { SenderMsg, RecdMsg, InputField, ContactCard } from '../../pages'
import { fetchMessages } from '../../redux/actions/userActions'
import { socket } from '../../ChatConfig'



const MessageSpace = () => {
    const { email } = useSelector(state => state.user)
    const { GroupName, isGroup, members, chatName, _id } = useSelector(state => state.chat)
    const { incomingMessage } = useSelector(state => state.app)
    const [messages, setMessages] = useState([])
    const [metadata, setMetadata] = useState('')
    const [drawer, setDrawer] = useState(false)


    useEffect(() => {
        const getMessages = async () => {
            setMessages(await fetchMessages(_id))
        }
        getMessages()
    }, [_id])


    socket.on('typing', (username) => {
        setMetadata(`${username} is typing...`)
    })

    socket.on('stop-typing', () => {
        setMetadata('')
    })


    useEffect(() => {
        if (incomingMessage) {
            let { conversation_id } = incomingMessage
            if (conversation_id === _id) {
                setMessages([...messages, incomingMessage])
            }
        }
    }, [incomingMessage])
    return (
        <>
            <section className={'message-space animate-slideright fixed right-0 ' }>
                <div className='w-[99%] h-[98%] bg-[--prm] flex flex-col  p-2 items-center  space-y-2 relative'>
                    <nav className=' h-16 w-[100%] bg-[--sec] flex p-3 items-center justify-between rounded-lg '  >
                        <div className='bg-[--sec] flex justify-between items-center space-x-3'>
                            <Img />
                            <div className='  space-x-2 flex justify-center items-center flex-col'>
                                <h2 className='font-bold font-sc text-[--text-h] text-xl'>{GroupName || chatName}</h2>
                                <h3 className='font-sc text-[--text-h] text-sm'>{metadata}</h3>
                            </div>
                        </div>
                        <div className='space-x-3 flex items-center'>
                            <h2 className='text-[--text-h]'>{null}</h2>
                            <Button onClick={() => setDrawer(true)}>
                                <Menu sx={{ color: 'white' }} />
                            </Button>
                        </div>
                    </nav>
                    <div className='  w-full  p-1 rounded-lg overflow-y-scroll' >
                        {messages.map((m,i) => {
                            if (m?.sender?.email === email) {
                                return <SenderMsg key={i} msg={m} />
                            }
                            else {
                                return <RecdMsg key={i} msg={m} />
                            }
                        })}
                    </div>
                    <InputField />

                </div>
                <Drawer onClose={() => setDrawer(false)} style={{ backgroundColor: '#ffffff10' }} placement='right' open={drawer} >
                    <div className="flex flex-col h-full w-full  items-center space-y-5  text-[--text-h]">
                        <Image className='rounded-[50%] max-h-[20vh] ' src={skl_image} />
                        <div className='  space-x-2 flex justify-center items-center flex-col'>
                            <h2 className='font-bold font-sc text-[--text-h] text-2xl'>{GroupName || chatName}</h2>
                        </div>
                        {isGroup && (<div className='w-[95%] max-h-[50%] overflow-y-scroll p-2 space-y-2'>
                            <h2 className='font-ubuntu text-xl font-bold ' >Members</h2>
                            <ul >
                                {members.map((m, i) => {
                                    return (
                                        <ContactCard chat={m} />
                                    )
                                })}
                            </ul>
                        </div>)}
                    </div>
                </Drawer>
            </section>
        </>
    )
}

export default MessageSpace
