const User = require('../models/User');

// Fetch user profile by userId (this will be available from the JWT token)
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId); // Getting user from DB using userId from JWT token
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming `req.user` is populated by authentication middleware
    const updates = req.body; // Get updates from request body

    if (!updates) {
      return res.status(400).json({ message: 'No updates provided' });
    }

    // Update user profile
    const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Internal server error', error });
  }
}