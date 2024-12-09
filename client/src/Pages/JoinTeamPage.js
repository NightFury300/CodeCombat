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
  }, [contestId, user]);

  const createTeam = async () => {
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
        { userId: user.userId, passkey: joinPasskey }
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

  return (
    <div className="container mx-auto max-w-4xl p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
        {contest?.name || 'Team Creation'}
      </h2>

      {userTeam ? (
        <div className="bg-green-100 text-green-800 px-4 py-3 rounded mb-6">
          You are already part of the team <strong>{userTeam.teamName}</strong>.
        </div>
      ) : (
        <>
          <div className="bg-blue-100 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-semibold text-blue-600 mb-4">Create a Team</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Team Name"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded"
              />
              <input
                type="number"
                placeholder="Team Size"
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                min="1"
                className="w-full p-3 border border-gray-300 rounded"
              />
              <input
                type="password"
                placeholder="Set a Passkey"
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded"
              />
            </div>
            <button
              onClick={createTeam}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? 'Creating Team...' : 'Create Team'}
            </button>
          </div>
        </>
      )}

      <h3 className="text-xl font-bold mb-4 text-gray-800">Available Teams</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {teams.map((team) => (
          <div key={team._id} className="border rounded-lg shadow p-4 bg-gray-100">
            <h4 className="text-lg font-semibold text-gray-700">{team.teamName}</h4>
            <p className="text-sm text-gray-600">
              Members: {team.members?.length || 0}/{team.teamSize}
            </p>
            {userTeam ? (
              <button
                disabled
                className="mt-2 bg-gray-300 text-gray-600 px-3 py-1 rounded w-full"
              >
                {team.members?.length >= team.teamSize ? 'Team Full' : 'Already Joined'}
              </button>
            ) : (
              <button
                onClick={() => handleJoinTeam(team)}
                className="mt-2 bg-green-600 text-white px-3 py-1 rounded w-full hover:bg-green-700"
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
            <h3 className="text-xl font-bold mb-4 text-gray-800">Enter Passkey</h3>
            <input
              type="password"
              value={joinPasskey}
              onChange={(e) => setJoinPasskey(e.target.value)}
              className="mb-4 p-3 border border-gray-300 rounded w-full"
              placeholder="Enter the passkey"
            />
            <button
              onClick={joinTeam}
              className="w-full bg-blue-600 text-white py-2 rounded mb-2 hover:bg-blue-700"
            >
              Join Team
            </button>
            <button
              onClick={() => setShowPasskeyModal(false)}
              className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
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
