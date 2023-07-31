import React from 'react'

const Loader = ({msg}) => {
  return (
    <div className='w-[100vw] h-[100vh] fixed top-0 flex flex-col justify-center items-center  ' >
      <div className="border-8 animate-spin  border-gray-400 border-b-[#000000] w-[12vmax] h-[12vmax] rounded-[50%]  ">
      </div>
            <h1 className="font-bold animate-bounce absolute ">Loading</h1>
            <p>{msg}</p>
    </div>
  )
}

export default Loader
