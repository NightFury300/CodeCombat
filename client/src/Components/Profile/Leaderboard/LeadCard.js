import React, { useEffect } from 'react';

const LeadCard = ({ user, index }) => {
  
  // Define a list of colors (orange, yellow, blue, violet)
  const colors = ['bg-orange-400', 'bg-yellow-400', 'bg-blue-400', 'bg-violet-400'];

  // Select a color based on the index (you can modify this logic if needed)
  const cardColor = colors[index % colors.length]; // This will loop through colors

  return (
    <div className={`h-20 w-full ${cardColor} rounded-2xl flex gap-2 items-center p-3`}>
      <div className='profile bg-slate-900 h-[50px] w-[50px] rounded-full overflow-hidden'><img src='' alt='img' /></div>
      <div className='info h-full w-full flex justify-between items-center  py-3 px-5'>
        <p className='text-gray-100 font-bold'>{user.username}</p>
        <p className='text-gray-100 font-medium'>{Math.ceil(user.statistics.rating)}</p>

      </div>
    </div>
  );
}

export default LeadCard;
