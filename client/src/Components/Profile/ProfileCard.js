import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {useAuth} from '../../Contexts/AuthContext'
const ProfileCard = () => {
  const { user, logout } = useAuth();

  const [userData, setUserData] = useState({
    username: user.name,
    email: user.email,
    contestsParticipated: 0,
    problemsSolved: 0,
    rank: 0,
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data and statistics
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/user/profile', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUserData(response.data);
      } catch (err) {
        setError('Failed to fetch user data');
      }
    };

    fetchUserProfile();
  }, []);


  return (

    <div className='bg-gray-100 h-[280px] w-[1156px] rounded-2xl relative ' >
      <div className='bg-gray-200 h-[110px] w-[110px] rounded-full absolute -top-[20%] left-[45%] flex items-center justify-center '><img src=" " alt="profile"/></div>
      <div className='info h-32 w-full flex flex-col items-center justify-end  p-1'>
        <p className='text-gray-400 font-semibold'>{userData.username}</p>
        <p className='text-gray-400 font-medium'>{userData.email}</p>
      </div>
      <div className='social h-16 w-full flex gap-3 items-center justify-center '>
        <div className='bg-black text-white font-semibold h-12 w-28 flex items-center justify-center rounded-3xl'>Github</div>
        <div className='bg-blue-600 text-white font-semibold h-12 w-28 flex items-center justify-center rounded-3xl'>LinkedIn</div>
      </div>
      <div className='status w-full h-20 flex justify-around items-center'>
         <div className='flex flex-col gap-2 w-1/3 items-center justify-center'><p className='text-gray-400'>{userData.contestsParticipated}</p><p className='font-semibold text-lg text-gray-600'>Total Combats</p></div>
         <div className='flex flex-col gap-2 w-1/3 items-center justify-center'><p className='text-gray-400'  >{userData.problemsSolved}</p><p className='font-semibold text-lg text-gray-600'>Problems Solved</p></div>
         <div className='flex flex-col gap-2 w-1/3 items-center justify-center'><p className='text-gray-400'>{userData.rank}</p><p className='font-semibold text-lg text-gray-600'>Rank</p></div>
      </div>

    </div>
  )
}

export default ProfileCard

