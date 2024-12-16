import { io } from 'socket.io-client';

// Connect to your backend Socket.IO server
const socket = io('http://localhost:5000'); // Replace with your backend URL

export default socket;
