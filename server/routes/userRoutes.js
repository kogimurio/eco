const express = require('express');
const router = express.Router();
const { 
    registerUser
} = require('../controllers/userController')

// Register user route
router.post('/register', registerUser);

module.exports = router;