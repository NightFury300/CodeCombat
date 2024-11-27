const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require("http");
const initializeSocket = require("./config/socket");

dotenv.config();

const app = express();
const server = http.createServer(app);
initializeSocket(server); // Pass the server instance for Socket.IO initialization

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000', // Use environment variable for flexibility
    methods: ['GET', 'POST', 'PUT', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
const contestRoutes = require('./routes/contestRoutes');
const teamRoutes = require('./routes/teamRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
app.get('/',(req,res)=>{
  res.send("Welcome to codecombat api")
})
app.use('/api/contest', contestRoutes);
app.use('/api/contest', teamRoutes); // Avoid route conflict
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

// Start server
server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
