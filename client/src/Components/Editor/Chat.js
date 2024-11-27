// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { io } from 'socket.io-client';

// const CodeEditor = () => {
//   const { teamId } = useParams();
//   const [socket, setSocket] = useState(null);
//   const [chatMessages, setChatMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');

//   useEffect(() => {
//     const socketConnection = io('http://localhost:5000');
//     setSocket(socketConnection);

//     socketConnection.emit('joinTeamRoom', { teamId });

//     socketConnection.on('newChatMessage', (message) => {
//       setChatMessages((prevMessages) => [...prevMessages, message]);
//     });

//     return () => socketConnection.disconnect();
//   }, [teamId]);

//   const sendMessage = () => {
//     if (newMessage.trim()) {
//       socket.emit('sendChatMessage', { teamId, message: newMessage });
//       setNewMessage('');
//     }
//   };

//   return (
//     <div className="code-editor-container">
//       <div className="chat-container">
//         <div className="chat-messages">
//           {chatMessages.map((msg, index) => (
//             <div key={index} className="chat-message">
//               <strong>{msg.sender}</strong>: {msg.message}
//             </div>
//           ))}
//         </div>
//         <div className="chat-input">
//           <input
//             type="text"
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             placeholder="Type your message..."
//           />
//           <button onClick={sendMessage}>Send</button>
//         </div>
//       </div>
//       <div className="code-editor">
//         {/* Add your code editor implementation here */}
//         <h3>Code Editor</h3>
//       </div>
//     </div>
//   );
// };

// export default CodeEditor;
