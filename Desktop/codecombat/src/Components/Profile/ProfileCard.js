import React from 'react'

const ProfileCard = () => {
  return (
    <div className='bg-gray-100 h-[280px] w-[1156px] rounded-2xl relative ' >
      <div className='bg-gray-200 h-[110px] w-[110px] rounded-full absolute -top-[20%] left-[45%] flex items-center justify-center '><img src=" " alt="profile"/></div>
      <div className='info h-32 w-full flex flex-col items-center justify-end  p-1'>
        <p className='text-gray-400 font-semibold'>Name</p>
        <p className='text-gray-400 font-medium'>@name0021</p>
      </div>
      <div className='social h-16 w-full flex gap-3 items-center justify-center '>
        <div className='bg-black text-white font-semibold h-12 w-28 flex items-center justify-center rounded-3xl'>Github</div>
        <div className='bg-blue-600 text-white font-semibold h-12 w-28 flex items-center justify-center rounded-3xl'>LinkedIn</div>
      </div>
      <div className='status w-full h-20 flex justify-around items-center'>
         <div className='flex flex-col gap-2 w-1/3 items-center justify-center'><p className='text-gray-400'>10</p><p className='font-semibold text-lg text-gray-600'>Total Combats</p></div>
         <div className='flex flex-col gap-2 w-1/3 items-center justify-center'><p className='text-gray-400'  >7</p><p className='font-semibold text-lg text-gray-600'>Win</p></div>
         <div className='flex flex-col gap-2 w-1/3 items-center justify-center'><p className='text-gray-400'>3</p><p className='font-semibold text-lg text-gray-600'>Loss</p></div>
      </div>

    </div>
  )
}

export default ProfileCard
