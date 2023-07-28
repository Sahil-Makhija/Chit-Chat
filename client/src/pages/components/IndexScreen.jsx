import React from 'react'
const IndexScreen = () => {
  if(window.innerWidth<768){
    return
  }
  return (
    <section id='app-bg'  className='w-[69vw] rounded-lg m-2 bg-[--sec] h-full  flex justify-center items-center bg-cover bg-no-repeat bg-fixed ' >
      <h1 className='text-[60px] text-white  font-bold font-sc '>Chit-Chat</h1>
    </section>
  )
}

export default IndexScreen
