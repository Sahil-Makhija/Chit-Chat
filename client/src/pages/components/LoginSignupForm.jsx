import { Tab, Tabs } from '@mui/material'
import React, { useState } from 'react'
import { Form, Input, message } from 'antd'
import { login, signUp } from '../../redux/actions/userActions';
import { useDispatch } from 'react-redux';

const LoginSignupForm = () => {
  const dispatch = useDispatch()
  const [messageApi,contextHolder]= message.useMessage()
  const [value, setValue] = useState('Login');
  const { Item } = Form
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLogin = async(values) => {
    let res = await login(dispatch,values)
    if (res.status){
      return messageApi.success({content:`Welcome, ${res.userData?.username}`})
    }
    else { return messageApi.error({content:res.error})}
  }

  const handleSignUp = async(values) => {
    let res = await signUp(dispatch,values)
    if (res.status){
      return messageApi.success({content:`Welcome, ${res.userData?.username}`})
    }
    else { return messageApi.error({content:res.error})}
  }

  return (
    <section className='login-form'>
      {contextHolder}
      <Form onFinish={(values)=>{
        if (value === 'Login'){
          handleLogin(values)
        }
        else{handleSignUp(values)}
      }
        } className='w-[80%] bg-[--sec] min-h-[60%] rounded-2xl flex flex-col items-center shadow-lg shadow-gray-700 space-y-7 p-2' >
      <h2 className='text-[6vmin] font-bold text-[--text]' >{value}</h2>

        <Tabs
          sx={{ width: '100%', color: 'var(--text)', }}
          value={value}
          onChange={handleChange}
          textColor=""
          indicatorColor="primary"
          aria-label="secondary tabs example"
        >

          <Tab sx={{ width: '50%', borderRadius: '50px', backgroundColor: value === 'Login' ? 'var(--prm)' : 'transparent' }} value="Login" label="Login" />
          <Tab sx={{ width: '50%', borderRadius: '50px ', backgroundColor: value === 'SignUp' ? 'var(--prm)' : 'transparent' }} value="SignUp" label="SignUp" />
        </Tabs>

        

        {value!=='Login' &&(<Item className=' flex  justify-center' name={'username'}  >
          <Input className='input-field-antd' spellCheck='false' autoComplete='off' placeholder='Full Name' />
        </Item>)}

        <Item className='flex  justify-center' name={'email'}  >
          <Input className='input-field-antd' spellCheck='false' autoComplete='off' placeholder='Email Address' />
        </Item>
        <Item className='w-[100%] h-full flex  justify-center' name={'password'}  >
          <Input  className='input-field-antd' type='password' placeholder='Password' />
        </Item>
        <button type='submit'  className=' text-[--text-h] text-[2.5vmin] rounded-[50px] bg-[--prm] w-[40%] p-3'>{value}</button>
      </Form>

    </section>
  )
}

export default LoginSignupForm
