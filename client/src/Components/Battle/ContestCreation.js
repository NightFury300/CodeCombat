import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ContestCreation = () => {
  const [name, setName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch available contests when the component mounts
  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/contest/all');
        setContests(response.data); // Expecting contests to contain _id field
      } catch (error) {
        console.error('Error fetching contests:', error);
      }
    };
    fetchContests();
  }, [contests]); // Don't need to track contests here, ideally fetch once

  // Function to create a contest
  const createContest = async () => {
    if (!name || !startTime || !endTime) {
      alert("All fields are required");
      return;
    }

    setLoading(true);
    const contestData = { name, startTime, endTime };

    try {
      const response = await axios.post('http://localhost:5000/api/contest/create', contestData);
      setContests(prevContests => [...prevContests, response.data]); // response.data should contain the contest with _id
      setName('');
      setStartTime('');
      setEndTime('');
    } catch (error) {
      console.error('Error creating contest:', error);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle joining a contest
  const joinContest = (contestId) => {
    console.log(contestId);
    navigate(`/contest/${contestId}/`); // Use _id instead of contestId
  };

  // Function to check if contest has started
  const getContestStatus = (startTime) => {
    const currentTime = Date.now();
    return currentTime >= new Date(startTime).getTime() ? 'Started' : 'Not Started';
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Create a Contest</h2>
    
      <div className='flex gap-4'>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Contest Name"
          className="mb-4 p-2 border"
        />
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="mb-4 p-2 border"
        />
        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="mb-4 p-2 border"
        />
      </div>

      <button onClick={createContest} className="bg-blue-500 text-white py-2 px-4 rounded">
        {loading ? 'Creating Contest...' : 'Create Contest'}
      </button>

      <div className="mt-6">
        <h3 className="text-xl font-bold mb-4">Available Contests</h3>

        {contests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {contests.map(contest => (
              <div
                key={contest._id}  // Use _id as the unique identifier for MongoDB
                className="border rounded-lg shadow-lg p-4 cursor-pointer"
                onClick={() => joinContest(contest._id)}  // Use _id to navigate
              >
                <h4 className="font-semibold text-lg">{contest.name}</h4>
                <p>Start Time: {new Date(contest.startTime).toLocaleString()}</p>
                <p>End Time: {new Date(contest.endTime).toLocaleString()}</p>
                <p>Status: {getContestStatus(contest.startTime)}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-xl text-gray-600">
            <p>😞 Sorry, no contests are available right now.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContestCreation;