const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const user = require('../models/User');

// Register Users
exports.registerUser = async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;

    // Basic validation
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
        // Prevent users from self-assigning admin role
        const validatedRole = role === 'admin' ? 'customer' : (role || 'customer');

        // Create new user
        const newUser = new User({
            firstName,
            lastName,
            email,
            password,
            role: role || 'customer'
        })
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully', user: newUser.firstName });
    } catch (error) {
        console.log('Registration error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Login User
exports.LoginUser = async (req, res) => {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        // find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d'}
        );

        // set token as HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // true if using HTTPS
            sameSite: 'Strict',
            maxAge: 60 * 60 * 1000 // 1 hour
        })

        .json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.log('login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


// Get logged in user profile
exports.getUserProfile = async (req, res) => {
    try {
        // Find user by ID from the token
        const user = await User.findById(req.user.userId).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.log('Profile fetch error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



