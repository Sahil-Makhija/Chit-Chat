import {Add, Code, EmojiEmotionsOutlined, FormatItalic, FormatListNumberedOutlined, FormatQuote, LinkOutlined, List, Send, StrikethroughS, FormatBold, TextFields, AlternateEmail } from '../icons'
import React, { useState } from 'react'
import { isTyping, sendMessage, stopTyping } from '../../ChatConfig';
import { useSelector } from 'react-redux';
import { Input, Modal, Tag,Button,Img } from '../ExtComponents';
import { handleFile } from '../../redux/actions/userActions';




const InputField = () => {

    const [input, setInput] = useState('')
    const [modal, setModal] = useState(false)
    const [tagged, setTagged] = useState([])
    const [membersModal, setMembersModal] = useState(false)
    const [file, setFile] = useState(null)
    const [type,setType] =useState('text')

    const { username, email } = useSelector(state => state.user)
    const { _id, members } = useSelector(state => state.chat)

    const InputButtons = () => {
    
        return <>
            <Button style={{ backgroundColor: type === 'text' ? 'var(--prm)' : 'inherit' }} onClick={() => { setType('text') }} >
                <TextFields sx={{ color: 'white' }} />
            </Button>
            <Button style={{ backgroundColor: type === 'bold' ? 'var(--prm)' : 'inherit' }} onClick={() => { setType('bold') }}>
                <FormatBold sx={{ color: 'white' }} />
            </Button>
            <Button style={{ backgroundColor: type === 'italics' ? 'var(--prm)' : 'inherit' }} onClick={() => { setType('italics') }}>
                <FormatItalic sx={{ color: 'white' }} />
            </Button>
            <Button style={{ backgroundColor: type === 'strikeThrough' ? 'var(--prm)' : 'inherit' }} onClick={() => { setType('strikeThrough') }}>
                <StrikethroughS sx={{ color: 'white' }} />
            </Button>
            <Button style={{ backgroundColor: type === 'link' ? 'var(--prm)' : 'inherit' }} onClick={() => { setType('link') }}>
                <LinkOutlined sx={{ color: 'white' }} />
            </Button>
            <Button style={{ backgroundColor: type === 'list' ? 'var(--prm)' : 'inherit' }} onClick={() => { setType('list') }}>
                <List sx={{ color: 'white' }} />
            </Button>
            <Button style={{ backgroundColor: type === 'orderedList' ? 'var(--prm)' : 'inherit' }} onClick={() => { setType('orderedList') }} >
                <FormatListNumberedOutlined sx={{ color: 'white' }} />
            </Button>
            <Button style={{ backgroundColor: type === 'blockQuote' ? 'var(--prm)' : 'inherit' }} onClick={() => { setType('blockQuote') }}>
                <FormatQuote sx={{ color: 'white' }} />
            </Button>
            <Button style={{ backgroundColor: type === 'code' ? 'var(--prm)' : 'inherit' }} onClick={() => { setType('code') }}>
                <Code sx={{ color: 'white' }} />
            </Button>
        </>
    }

    



    const handleClose = (removedTag) => {
        const newTags = tagged.filter((tag) => tag !== removedTag);
        console.log(newTags);
        setTagged(newTags);
    }

    return (
        <div className='min-h-[14vmin]  w-[100%] bg-[--sec] absolute bottom-0 flex flex-col justify-evenly  items-center py-2  ' >
            <div className="w-full flex space-x-3 ">

                <Modal title='Members' onCancel={() => setMembersModal(false)} open={membersModal} footer={null} >
                    {members?.map((m, i) => {
                        return (
                            <div onClick={() => setTagged([...tagged, m])} className='contact-card h-[10vmin] max-h-[10vmin] my-1  rounded-lg '>
                                <Img />
                                <div className="flex flex-col  ">
                                    <h2 className='text-[--text-h]'>{m.username || `User ${i + 1}`}</h2>
                                    <span className='text-[2vmin] text-[--text] ' >{m.email || null}</span>
                                </div>
                            </div>
                        )
                    })}
                </Modal>
                <Modal onCancel={() => setModal(false)} footer={null} open={modal} title='File Upload'  >
                    <Input onChange={(e) => setFile(e.target.files[0])} type='file' />
                    <div className='w-full flex space-x-3' >
                        <button onClick={() => handleFile(file)} className='bg-[--prm] text-white font-ubuntu px-2 py-1 rounded-md'
                        >Upload</button>
                        <button onClick={() => setModal(false)} className='text-[--prm] border-[--prm] border-[1.5px]  font-ubuntu px-2 py-1 rounded-md'
                        >Cancel</button>
                    </div>
                </Modal>

                    <InputButtons/>

                <div className='flex w-[30%] flex-wrap justify-end '>
                    {tagged.map((t) => {
                        return <Tag onClose={() => handleClose(t)} className='flex font-bold text-md items-center my-1 justify-center  ' closable color='purple'>{t?.username}</Tag>
                    })}
                </div>

            </div>
            <textarea value={input} onChange={(e) => setInput(e.target.value)} spellCheck='false' className='bg-inherit my-1  placeholder:text-[--text] focus:outline-none text-white px-5 min-h-[5vmin]  w-full ' placeholder='Chat comes here...' />
            <div className="w-full flex justify-between ">
                <div className='flex space-x-2'>
                    <Button onClick={() => { setModal(true) }} ><Add sx={{ color: 'white' }} /></Button>
                    <Button  >
                        <EmojiEmotionsOutlined sx={{ color: 'white' }} />
                    </Button>
                    <Button onClick={() => setMembersModal(true)}>
                        <AlternateEmail sx={{ color: 'white' }} />
                    </Button>
                </div>
                <Button
                    disabled={input === '' ? true : false}
                    onChange={(e)=>{
                        if (e.target.value === ""){
                            stopTyping({room:_id,username})
                        }
                        setTimeout(() => {
                            isTyping({room:_id,username})
                        }, 300);
                    }}
                    onClick={() => {
                        sendMessage(_id, { sender: { username, email }, content: input, type, tagged,conversation_id:_id })
                        setInput('')
                    }}
                    style={{ backgroundColor: 'green' }} >
                    <Send sx={{ color: 'white' }} />
                </Button>
            </div>
        </div>
    )
}

export default InputField
