import React from 'react'
import LeadCard from './LeadCard'

const Leaderboard = () => {
  return (
    <div className='h-[500px] w-[480px]  rounded-2xl flex flex-col gap-4'>
      <div className='flex items-center justify-center text-4xl' >Leaderboard</div>
      <div className='p-3 rounded-2xl h-[500px]  flex flex-col gap-2 '>
        <LeadCard/>
        <LeadCard/><LeadCard/><LeadCard/><LeadCard/><LeadCard/>
      </div>
    </div>
  )
}

export default Leaderboard
