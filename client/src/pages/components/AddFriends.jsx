import { Add, Close } from '@mui/icons-material'
import { Button, message } from 'antd'
import React, { useState } from 'react'
import { handleFindFriends, sendFriendRequest } from '../../redux/actions/userActions'
import {  useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AddFriends = () => {
  const navigate = useNavigate()
  const { email,isLoggedIn,username } = useSelector(state => state.user)
  const [messageApi, contextHolder] = message.useMessage()

  const handleFriendRequest =async (receiver) => {
    let request = {
      sender:{username,email},
      receiver
    }
    let res = await sendFriendRequest(request)
    if (!res?.status){
      messageApi.error({content:'Couldn\'t send request!'})
    }
    else{
      messageApi.success({content:'Request Sent'})
    }
  }


  const [friends, setFriends] = useState([])
  if(isLoggedIn){
  return (
    <section className='bg-[#00000088] w-[100vw]  h-[100vh] flex z-50 justify-center fixed items-center '>
      {contextHolder}
      <div className='h-[80%] w-[80%] z-50 bg-[--prm]  rounded-xl ' >
        <div className='bg-[--sec] text-[--text-h] rounded-t-xl  px-4   flex items-center justify-evenly flex-col  md:flex-row md:h-[8vmin] space-y-2 relative'>
          <h1 className='text-[5vmin] font-bold  font-sc ' > Find Friends</h1>
          <div className='flex items-center  h-[60%] md:w-[40%] border-b-[1.5px] justify-between '>
            <input onChange={
              async (e) => {
                let response = await handleFindFriends(e.target.value)
                setFriends(response?.users?.filter((user)=>{
                  return true ? user.email !== email :false
                }))
              }
            } className=' w-[90%] h-full bg-transparent focus:outline-none text-center ' placeholder=' 🔍 Search people with Email id' type="email" />
          </div>
            <Button  onClick={()=>navigate('/')} className='border-none absolute top-2 right-2 '><Close className='text-white' /></Button>
        </div>
        <div className='w-full h-[3vmin] bg-[--text] ' ></div>
        {
          friends?.map((friend) => {
            return (
              <div className='w-full p-1 min-h-[8vmin] bg-[--sec] border-b-[2px] border-[--text] flex items-center justify-evenly  ' >
                <div className='w-[70%] '>
                  <h2 className='font-bold text-[3vmin] text-[--text-h]' >{friend.username}</h2>
                  <h3 className='text-[2vmin] text-[--text] mx-3'>{friend.email}</h3>
                </div>
                <Button  onClick={() => { handleFriendRequest(friend) }} className='border-none text-[3vmin] text-[--text-h] flex items-center justify-between bg-[--prm] h-[70%] w-[15%] '>
                  <Add sx={{ color: 'white' }} /> <span> Add friend</span>
                </Button>
              </div>
            )
          })
        }
      </div>
    </section>
  )}
}

export default AddFriends
