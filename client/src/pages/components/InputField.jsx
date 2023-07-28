import { Add, Code, EmojiEmotionsOutlined, FormatItalic, FormatListNumberedOutlined, FormatQuote, LinkOutlined, List, Send, StrikethroughS, FormatBold, TextFields } from '../icons'
import React, { useState } from 'react'
import { isTyping, sendMessage, stopTyping } from '../../ChatConfig';
import { useSelector } from 'react-redux';
import { Input, Modal, Button } from '../ExtComponents';
import { handleFile } from '../../redux/actions/userActions';




const InputField = () => {

    const [input, setInput] = useState('')
    const [modal, setModal] = useState(false)
    const [tagged, setTagged] = useState([])
    const [file, setFile] = useState(null)
    const [type, setType] = useState('text')

    const { username, email } = useSelector(state => state.user)
    const { _id, members } = useSelector(state => state.chat)

    const InputButtons = () => {

        return <div className='flex space-x-2 overflow-y-hidden overflow-x-scroll'>
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
        </div>
    }


    return (
        <div className=' w-full rounded-lg   bg-[--sec]  flex flex-col justify-evenly  items-center p-2 absolute bottom-2 ' >
            <div className="w-[100%] flex space-x-3 ">


                <Modal onCancel={() => setModal(false)} footer={null} open={modal} title='File Upload'  >
                    <Input onChange={(e) => setFile(e.target.files[0])} type='file' />
                    <div className='w-full flex space-x-3' >
                        <button onClick={() => handleFile(file)} className='bg-[--prm] text-white font-ubuntu px-2 py-1 rounded-md'
                        >Upload</button>
                        <button onClick={() => setModal(false)} className='text-[--prm] border-[--prm] border-[1.5px]  font-ubuntu px-2 py-1 rounded-md'
                        >Cancel</button>
                    </div>
                </Modal>

                <InputButtons />



            </div>
            <textarea value={input} onChange={(e) => setInput(e.target.value)} spellCheck='false' className=' bg-inherit my-1  placeholder:text-[--text] focus:outline-none text-white px-5 min-h-[5vmin]  w-full ' placeholder='Chat comes here...' />
            <div className="w-full flex justify-between ">
                <div className='flex space-x-2'>
                    <Button onClick={() => { setModal(true) }} ><Add sx={{ color: 'white' }} /></Button>
                    <Button  >
                        <EmojiEmotionsOutlined sx={{ color: 'white' }} />
                    </Button>
                </div>
                <Button
                    disabled={input === '' ? true : false}
                    onChange={(e) => {
                        if (e.target.value === "") {
                            stopTyping({ room: _id, username })
                        }
                        setTimeout(() => {
                            isTyping({ room: _id, username })
                        }, 300);
                    }}
                    onClick={() => {
                        sendMessage(_id, { sender: { username, email }, content: input, type, tagged, conversation_id: _id })
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
