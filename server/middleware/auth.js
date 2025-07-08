const jwt = require('jsonwebtoken');

// Middleware to authenticate JWT token
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Check if token is provided in the format "Bearer <token>"
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Authorization token is required'})
    }

    const token = authHeader.split(' ')[1];

    try {
        // Very token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // req.user = decoded; now user can be accessed in routes
        req.user = decoded;
        next(); // Allow request to proceed
    } catch (error) {
        console.error('JWT verification error:', error);
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
};

module.exports = authMiddleware;