import React, { useEffect } from 'react'
import { NavDrawer, MessageSpace, LoginSignupForm, IndexScreen } from './pages'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { login } from './redux/actions/userActions'
import Cookies from 'js-cookie'

const App = () => {
  const dispatch = useDispatch()
  const { isLoggedIn } = useSelector(state => state.user)
  const { isChatSelected } = useSelector(state => state.chat)

  const token = Cookies.get('token')
  useEffect(()=>{
    if(!isLoggedIn && token){
      login(dispatch, { token })
    }
  },[dispatch,token,isLoggedIn])
  return (
    <>
      <Outlet />
      {isLoggedIn ? (<NavDrawer />) : (<LoginSignupForm />)}
      {isChatSelected ? (<MessageSpace />) : (<IndexScreen />)}

    </>
  )
}

export default App
