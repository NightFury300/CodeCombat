import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../Contexts/UserContext';

const TeamCreation = () => {
  const { contestId } = useParams(); // Extract contestId from URL params
  const { user } = useUser(); // Get user data from context
  const [contest, setContest] = useState(null); // To store contest data (optional)
  const [teamName, setTeamName] = useState('');
  const [teamSize, setTeamSize] = useState(2); // Default team size of 2
  const [loading, setLoading] = useState(false);
  const [teams, setTeams] = useState([]);
  const [userTeam, setUserTeam] = useState(null); // Store the team the user has already joined
  const navigate = useNavigate();

  // Fetch contest details
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

  // Fetch teams for the current contest
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/contest/${contestId}/teams`);
        setTeams(response.data);

        // Check if the user is already part of a team
        const joinedTeam = response.data.find((team) => team.members.includes(user.userId));
        setUserTeam(joinedTeam || null);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };
    fetchTeams();
  }, [contestId, user]);

  // Function to handle team creation
  const createTeam = async () => {
    if (userTeam) {
      alert('You are already part of a team in this contest.');
      return;
    }

    if (!teamName || teamSize <= 0) {
      alert('Please provide a team name and a valid team size.');
      return;
    }

    setLoading(true);
    const teamData = {
      teamName,
      teamSize,
      contestId, // Associate team with the contestId
      members: [user.userId], // Add the logged-in user as the default member of the team
    };

    try {
      const response = await axios.post(
        `http://localhost:5000/api/contest/${contestId}/team/create`,
        teamData
      );
      setTeams((prevTeams) => [...prevTeams, response.data]); // Add new team to state
      setUserTeam(response.data); // Set the newly created team as the user's team
      setTeamName('');
      setTeamSize(2); // Reset to default size
    } catch (error) {
      console.error('Error creating team:', error);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle joining a team
  const joinTeam = async (teamId, team) => {
    if (userTeam) {
      alert('You are already part of a team in this contest.');
      return;
    }

    try {
      // If the team is full, redirect all members to the code editor
      if (team.members.length >= team.teamSize) {
        // Redirect all team members to the code editor
        team.members.forEach((memberId) => {
          navigate(`/contest/${contestId}/team/${teamId}/code-editor`);
        });
        return;
      }

      const response = await axios.put(
        `http://localhost:5000/api/contest/${contestId}/team/${teamId}/join`,
        { userId: user.userId }, // Send only the userId
        {
          headers: { Authorization: `Bearer ${user.token}` }, // Include authorization token
        }
      );

      // Update the local team list in state
      setTeams((prevTeams) =>
        prevTeams.map((t) => (t._id === teamId ? response.data.team : t))
      );

      // Set the joined team as the user's team
      setUserTeam(response.data.team);

      // If the team is now full, navigate all members to the code editor
      if (response.data.team.members.length >= team.teamSize) {
        response.data.team.members.forEach((memberId) => {
          navigate(`/contest/${contestId}/team/${teamId}/code-editor`);
        });
      }
    } catch (error) {
      console.error('Error joining team:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    // If the user is part of a full team, redirect them to the code editor
    if (userTeam && userTeam.members.length >= userTeam.teamSize) {
      navigate(`/contest/${contestId}/team/${userTeam._id}/code-editor`);
    }

    // Refresh the page every 10 seconds
    const intervalId = setInterval(() => {
      window.location.reload();
    }, 10000);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [userTeam, contestId, navigate]);

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">
        Create a Team for {contest ? contest.name : 'Loading...'}
      </h2>

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
              className="mb-4 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Enter Team Size"
              value={teamSize}
              onChange={(e) => setTeamSize(Number(e.target.value))}
              min="1"
              className="mb-4 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={createTeam}
            className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600 focus:outline-none"
            disabled={loading}
          >
            {loading ? 'Creating Team...' : 'Create Team'}
          </button>
        </>
      )}

      <div className="mt-6">
        <h3 className="text-xl font-bold mb-4">Awaiting Teams</h3>

        {teams.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map((team) => {
              const isTeamFull = team.members.length >= team.teamSize;

              if (isTeamFull) return null; // Skip full teams

              return (
                <div
                  key={team._id}
                  className={`border rounded-lg shadow-lg p-4 cursor-pointer transition ease-in-out duration-300 ${
                    userTeam
                      ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                      : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                  onClick={() => {
                    if (!userTeam) {
                      joinTeam(team._id, team);
                    }
                  }}
                >
                  <h4 className="font-semibold text-lg">{team.teamName}</h4>
                  <p>Team Size: {team.members.length}/{team.teamSize}</p>
                  <p>Unique Id: {team._id}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center text-xl text-gray-600">
            <p>No teams are awaiting members yet.</p>
          </div>
        )}

        <h3 className="text-xl font-bold mt-6 mb-4">Full Teams</h3>

        {teams.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map((team) => {
              const isTeamFull = team.members.length >= team.teamSize;

              if (!isTeamFull) return null; // Skip non-full teams

              return (
                <div
                  key={team._id}
                  className="border rounded-lg shadow-lg p-4 bg-red-500 text-white cursor-not-allowed"
                >
                  <h4 className="font-semibold text-lg">{team.teamName}</h4>
                  <p>Team Size: {team.members.length}/{team.teamSize}</p>
                  <p>Unique Id: {team._id}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center text-xl text-gray-600">
            <p>No full teams yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamCreation;
