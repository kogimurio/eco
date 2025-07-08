const User = require('../models/User');

// Register users
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

