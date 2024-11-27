const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: { type: String, unique: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  statistics: {
    contestsParticipated: { type: Number, default: 0 },
    contestsWon: { type: Number, default: 0 },
    contestsLost: { type: Number, default: 0 },
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
