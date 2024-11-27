import React from 'react'

const LeadCard = () => {
  return (
    <div className='h-20 w-full bg-white rounded-2xl flex gap-2 items-center p-3 '>
      <div className='profile bg-slate-500 h-[60px] w-[60px] rounded-full'></div> 
      <div className='info h-full w-full flex flex-col items-center justify-end  p-1 '>
        <p className='text-gray-400 font-semibold'>Name</p>
        <p className='text-gray-400 font-medium'>@name0021</p>
      </div>
    </div>
  )
}

export default LeadCard
