const express = require('express');
const router = express.Router();
const { updateUserProfile,getUserProfile, } = require('../controllers/userController'); // Ensure the correct path
const { isAuthenticated } = require('../middleware/auth'); // Assuming the middleware is correctly implemented


// Route to get user profile (including statistics)
router.get('/profile', isAuthenticated, getUserProfile);

router.put('/update', isAuthenticated, updateUserProfile);

module.exports = router;
