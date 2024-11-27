import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';

const PracticePage = () => {
  const { contestId } = useParams(); // Get contest ID from URL
  const { user } = useAuth(); // Get user details
  const navigate = useNavigate();
  const [teamId, setTeamId] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const createTeam = () => {
    const teamData = {
      teamName: `${user.name}'s Team`,
      members: [user.name],
    };

    // Simulate team creation by setting the team data directly
    setTeamId('teamId123'); // Set a mock team ID
    setTeamMembers([user.name]); // Set the team members
    navigate(`/contest/${contestId}/team/editor`); // Redirect to the code editor page
  };

  const sendMessage = () => {
    if (message.trim()) {
      // Simulate sending a message
      const newMessage = {
        teamId,
        message,
        sender: user.name,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage(''); // Clear the message input after sending
    }
  };

  return (
    <div>
      <h1>Contest: {contestId}</h1>
      <h2>Team Page</h2>
      
      {/* Show team creation form or join form */}
      {!teamId ? (
        <>
          <button onClick={createTeam}>Create Team</button>
          {/* Optionally, allow joining a team */}
        </>
      ) : (
        <>
          <h3>Team Members</h3>
          <ul>
            {teamMembers.map((member, index) => (
              <li key={index}>{member}</li>
            ))}
          </ul>
          
          {/* Chat functionality */}
          <div>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
          
          <div>
            <h3>Chat</h3>
            <ul>
              {messages.map((msg, index) => (
                <li key={index}>
                  <strong>{msg.sender}: </strong>{msg.message}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};
         
export default PracticePage;
