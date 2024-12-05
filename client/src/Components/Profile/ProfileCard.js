import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../../Contexts/UserContext'; // Import the custom hook
import Stats from './Stats';

const ProfileCard = () => {
  const { user } = useUser(); 
  const [userData, setUserData] = useState({
    contestsParticipated: 0,
    problemsSolved: 0,
    rank: 0,
  });
  const [profile,setProfile]=useState('')
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      const userId=user.userId
      // Fetch user data and statistics
      const fetchUserProfile = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/user/${userId}`
          );
          
          setUserData(response.data.user.statistics);
          setProfile(response.data.user.googleId)
        } catch (err) {
          setError('Failed to fetch user data');
        }
      };

      fetchUserProfile();
    }
  }, [user]);

  if (!user) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div className="bg-gray-100 h-[350px] w-[1156px] rounded-2xl relative">
      <div className="bg-gray-200 h-[110px] w-[110px] rounded-full absolute -top-[20%] left-[45%] flex items-center justify-center">
        <img src={`https://lh3.googleusercontent.com/a-/AOh14${profile}`} alt="profile" />
      </div>
      <div className="info h-32 w-full flex flex-col items-center justify-end p-1">
        <p className="text-gray-400 font-semibold">{user.username}</p>
        <p className="text-gray-400 font-semibold">{user.email}</p>

      </div>
      <div className="social h-16 w-full flex gap-3 items-center justify-center">
        <div className="bg-black text-white font-semibold h-12 w-28 flex items-center justify-center rounded-3xl">
          Github
        </div>
        <div className="bg-blue-600 text-white font-semibold h-12 w-28 flex items-center justify-center rounded-3xl">
          LinkedIn
        </div>
      </div>
      <Stats/>
    </div>
  );
};

export default ProfileCard;
