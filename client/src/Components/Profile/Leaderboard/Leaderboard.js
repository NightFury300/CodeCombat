import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LeadCard from './LeadCard';

const Leaderboard = () => {
  const [users, setUsers] = useState([]); // Initialize users as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/`);
        
        // Assuming the response contains a 'leaderboard' array
        setUsers(response.data.leaderboard || []); // Ensure it's always an array
        console.log(users)
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);



  // Handle loading and error
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='h-[500px] w-[480px] rounded-2xl flex flex-col gap-4'>
      <div className='flex items-center justify-center text-4xl font-bold text-white'>Leaderboard</div>
      <div className='p-3 rounded-2xl h-[500px] flex flex-col gap-2'>
        {users.map((user,index) => (
          <LeadCard key={user._id} user={user} index={index} /> // Pass individual user to LeadCard
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
