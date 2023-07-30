import React, { useEffect, useState } from 'react'
import { NavDrawer, LoginSignupForm, IndexScreen } from './pages'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { login } from './redux/actions/userActions'
import Cookies from 'js-cookie'
import { socket } from './ChatConfig'
import { notification } from 'antd'

const App = () => {
  const dispatch = useDispatch()
  const { _id } = useSelector(state => state.chat)
  const [api , contextHolder] = notification.useNotification()
  const [incomingMessage, setIncomingMessage] = useState(undefined)

  socket.on('message', (msg) => {
    setIncomingMessage(msg)
  })

  useEffect(() => {
    if (incomingMessage) {
      let { conversation_id } = incomingMessage
      if (conversation_id !== _id) {
        api.info({
          message:`New Message`,
          description:`${incomingMessage?.sender?.username} : ${incomingMessage?.content}`,
          placement:'bottomRight',
          duration:3
        })
        dispatch({ type: 'NEW_NOTIFICATION', payload: incomingMessage })
      }
      else {
        dispatch({ type: "NEW_MESSAGE", payload: incomingMessage })
      }
    }
  }, [incomingMessage])
  const { isLoggedIn } = useSelector(state => state.user)
  const { isChatSelected } = useSelector(state => state.chat)

  const token = Cookies.get('token')
  useEffect(() => {
    if (!isLoggedIn && token) {
      login(dispatch, { token })
    }
  }, [dispatch, token, isLoggedIn])
  return (
    <section className='inline-flex h-screen w-screen space-x-1'>
      {contextHolder}
      {isLoggedIn ? (<NavDrawer />) : (<LoginSignupForm />)}
      <div className='h-full w-[1px] bg-[--sec] text-white my-2 ' ></div>
      {isChatSelected ? (<Outlet/>) : (<IndexScreen />)}

    </section>
  )
}

export default App
