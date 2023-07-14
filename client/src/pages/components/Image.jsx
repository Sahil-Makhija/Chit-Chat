import React from 'react'
import image from '../../assets/blank.webp'
import { Avatar } from '@mui/material'


const Image = () => {
    let profilePicture


  return (
    <>
    <Avatar className='profile-pic' src={profilePicture || image} alt='' />
    </>

  )
}

export default Image
