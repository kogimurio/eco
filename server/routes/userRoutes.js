const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth')
const { 
    registerUser,
    LoginUser,
    getUserProfile,
    getAllUsers
} = require('../controllers/userController')

// Register user route
router.post('/register', registerUser);
router.post('/login', LoginUser);
router.post('/profile', authMiddleware, getUserProfile);
router.get('/get_all_users',
    getAllUsers
);

module.exports = router;