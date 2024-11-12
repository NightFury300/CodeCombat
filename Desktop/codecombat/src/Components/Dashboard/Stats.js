import React from 'react'
import StatusGraph from './StatusGraph'

const Stats = () => {
  return (
    <div className='h-[500px]  w-[1156px] rounded-xl flex flex-col gap-3'>
     <select className='w-20 h-8  p-1 rounded-md bg-gray-200' >
        <option>2022</option>
        <option>2023</option>
        <option>2024</option>
      </select>
      <div className='flex items-center justify-center'><StatusGraph/></div>
      <div className='status w-full h-40 flex justify-around items-center'>
         <div className='flex flex-col gap-0.5 w-1/3 items-center justify-center'><div className='h-16 w-16 bg-orange-400 rounded-full'></div><p className='text-gray-400'>10/50</p><p className='font-semibold text-lg text-gray-600'>Time Spent</p></div>
         <div className='flex flex-col gap-0.5 w-1/3 items-center justify-center'><div className='h-16 w-16 bg-yellow-400 rounded-full'></div><p className='text-gray-400' >7/50</p><p className='font-semibold text-lg text-gray-600'>Rank</p></div>
         <div className='flex flex-col gap-0.5 w-1/3 items-center justify-center'><div className='h-16 w-16 bg-blue-400 rounded-full'></div><p className='text-gray-400'>3/50</p><p className='font-semibold text-lg text-gray-600'>Accuracy</p></div>
      </div>
    </div>  
  )
}
export default Stats
