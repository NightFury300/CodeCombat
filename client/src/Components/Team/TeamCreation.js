// import React, { useState } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';

// const TeamCreation = () => {
//   const { contestId } = useParams(); // Get contestId from URL params
//   const [teamName, setTeamName] = useState('');
//   const [teamKey, setTeamKey] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   // Get the JWT token from sessionStorage
//   const token = sessionStorage.getItem('token');
  
//   // Create Team function
//   const createTeam = async () => {
//     if (!teamName) {
//       alert('Team name is required');
//       return;
//     }
  
//     setLoading(true);
  
//     const token = sessionStorage.getItem('token'); // Get the token
//     console.log("Token from session:", token); // Debugging the token
  
//     if (!token) {
//       alert('No token found, please log in');
//       setLoading(false);
//       return;
//     }
  
//     try {
//       // Use the correct URL with the dynamic contestId
//       const response = await axios.post(
//         `http://localhost:5000/api/contest/${contestId}/create-team`, // Dynamically use contestId in the URL
//         {
//           teamName,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`, // Send token for authentication
//           },
//         }
//       );
  
//       setTeamKey(response.data.teamKey); // Store the team key returned by the backend
//       alert('Team created successfully! Share the key with others.');
//     } catch (error) {
//       console.error('Error creating team:', error);
//       if (error.response && error.response.status === 401) {
//         alert('Unauthorized. Please login again.');
//       } else {
//         alert('Error creating team.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   // Join Team function
//   const joinTeam = async () => {
//     if (!teamKey) {
//       alert('Please enter a valid team key');
//       return;
//     }

//     setLoading(true);

//     try {
//       // Send the JWT token in the Authorization header
//       const response = await axios.post(
//         'http://localhost:5000/api/contest/${contestId}/create-team',
//         {
//           contestId,
//           teamKey,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       alert('Joined team successfully!');
//       navigate(`/contest/${contestId}/code-editor/${response.data.teamId}`);
//     } catch (error) {
//       console.error('Error joining team:', error);
//       if (error.response && error.response.status === 401) {
//         alert('Unauthorized. Please login again.');
//       } else {
//         alert('Invalid team key or team does not exist.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold text-center mb-6">Create or Join a Team</h2>

//       <div>
//         <h3 className="text-xl font-bold mb-4">Create a Team</h3>
//         <input
//           type="text"
//           value={teamName}
//           onChange={(e) => setTeamName(e.target.value)}
//           placeholder="Team Name"
//           className="mb-4 p-2 border"
//         />
//         <button
//           onClick={createTeam}
//           className="bg-blue-500 text-white py-2 px-4 rounded"
//         >
//           {loading ? 'Creating Team...' : 'Create Team'}
//         </button>
//       </div>

//       <div className="mt-6">
//         <h3 className="text-xl font-bold mb-4">Join a Team</h3>
//         <input
//           type="text"
//           value={teamKey}
//           onChange={(e) => setTeamKey(e.target.value)}
//           placeholder="Enter Team Key"
//           className="mb-4 p-2 border"
//         />
//         <button
//           onClick={joinTeam}
//           className="bg-green-500 text-white py-2 px-4 rounded"
//         >
//           {loading ? 'Joining Team...' : 'Join Team'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TeamCreation;

