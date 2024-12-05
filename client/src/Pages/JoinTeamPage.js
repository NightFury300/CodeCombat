import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../Contexts/UserContext';

const TeamCreation = () => {
  const { contestId } = useParams();
  const { user } = useUser();
  const [contest, setContest] = useState(null);
  const [teamName, setTeamName] = useState('');
  const [teamSize, setTeamSize] = useState(2);
  const [passkey, setPasskey] = useState('');
  const [loading, setLoading] = useState(false);
  const [teams, setTeams] = useState([]);
  const [userTeam, setUserTeam] = useState(null);
  const [joinPasskey, setJoinPasskey] = useState('');
  const [teamToJoin, setTeamToJoin] = useState(null); // To track the team being joined
  const [showPasskeyModal, setShowPasskeyModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContest = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/contest/${contestId}`);
        setContest(response.data);
      } catch (error) {
        console.error('Error fetching contest:', error);
      }
    };
    fetchContest();
  }, [contestId]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/contest/${contestId}/teams`);
        setTeams(response.data);
        const joinedTeam = response.data.find((team) => team.members.includes(user.userId));
        setUserTeam(joinedTeam);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };
    fetchTeams();
  }, [contestId, user,userTeam]);

  useEffect(() => {
    // If the user is part of a full team, redirect them to the code editor
    if (userTeam && userTeam.members?.length >= userTeam.teamSize) {
      navigate(`/contest/${contestId}/team/${userTeam._id}/code-editor`);
    }

    // Refresh the page every 30 seconds
    const intervalId = setInterval(() => {
      window.location.reload();
    }, 30000);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [userTeam, contestId, navigate]);

  const createTeam = async () => {
    if (userTeam) {
      alert('You are already part of a team in this contest.');
      return;
    }

    if (!teamName || teamSize <= 0 || !passkey) {
      alert('Please provide a team name, a valid team size, and a passkey.');
      return;
    }

    setLoading(true);
    const teamData = {
      teamName,
      teamSize,
      passkey,
      contestId,
      members: [user.userId],
    };

    try {
      const response = await axios.post(
        `http://localhost:5000/api/contest/${contestId}/team/create`,
        teamData
      );
      setTeams((prevTeams) => [...prevTeams, response.data]);
      setUserTeam(response.data);
      setTeamName('');
      setTeamSize(2);
      setPasskey('');
    } catch (error) {
      console.error('Error creating team:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinTeam = (team) => {
    setTeamToJoin(team);
    setShowPasskeyModal(true);
  };

  const joinTeam = async () => {
    if (!joinPasskey) {
      alert('Please enter the passkey to join the team.');
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/api/contest/${contestId}/team/${teamToJoin._id}/join`,
        { userId: user.userId, passkey: joinPasskey },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      setTeams((prevTeams) =>
        prevTeams.map((t) => (t._id === teamToJoin._id ? response.data.team : t))
      );
      setUserTeam(response.data.team);
      setShowPasskeyModal(false);
      setJoinPasskey('');
      setTeamToJoin(null);
    } catch (error) {
      console.error('Error joining team:', error.response?.data || error.message);
      alert('Invalid passkey or error joining the team.');
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
     

      {userTeam ? (
        <div className="mb-6 text-center text-green-600 font-bold">
          You are already part of the team <span>{userTeam.teamName}</span>.
        </div>
      ) : (
        <>
          <div className="mb-6">
            <input
              type="text"
              placeholder="Enter Team Name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="mb-4 p-2 border border-gray-300 rounded w-full"
            />
            <input
              type="number"
              placeholder="Enter Team Size"
              value={teamSize}
              onChange={(e) => setTeamSize(Number(e.target.value))}
              min="1"
              className="mb-4 p-2 border border-gray-300 rounded w-full"
            />
            <input
              type="password"
              placeholder="Set a Passkey"
              value={passkey}
              onChange={(e) => setPasskey(e.target.value)}
              className="mb-4 p-2 border border-gray-300 rounded w-full"
            />
          </div>

          <button
            onClick={createTeam}
            className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? 'Creating Team...' : 'Create Team'}
          </button>
        </>
      )}

      <div className="mt-6">
        <h3 className="text-xl font-bold mb-4">Teams</h3>

        {teams.map((team) => (
          <div key={team._id} className="border rounded-lg shadow-lg p-4 mb-4">
            <h4>{team.teamName}</h4>
            <p>Members: {team.members?.length || 0}/{team.teamSize}</p>
            {userTeam ? (
              <button disabled className="bg-gray-300 text-gray-600 p-2 rounded mt-2">
                {team.members?.length >= team.teamSize ? 'Team Full' : 'Already Joined'}
              </button>
            ) : (
              <button
                onClick={() => handleJoinTeam(team)}
                className="bg-green-500 text-white p-2 rounded mt-2"
              >
                Join Team
              </button>
            )}
          </div>
        ))}
      </div>

      {showPasskeyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Enter Passkey</h3>
            <input
              type="password"
              value={joinPasskey}
              onChange={(e) => setJoinPasskey(e.target.value)}
              className="mb-4 p-2 border border-gray-300 rounded w-full"
              placeholder="Enter the passkey"
            />
            <button
              onClick={joinTeam}
              className="bg-blue-500 text-white py-2 px-4 rounded w-full mb-2"
            >
              Join
            </button>
            <button
              onClick={() => setShowPasskeyModal(false)}
              className="bg-red-500 text-white py-2 px-4 rounded w-full"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default TeamCreation;
