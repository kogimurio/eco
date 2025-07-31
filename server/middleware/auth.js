const jwt = require('jsonwebtoken');

// Middleware to authenticate JWT token
const authMiddleware = (req, res, next) => {
    let token = req.cookies?.token;
    

    // check token via Authorization header
    if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ error: 'Access denied, no token provided' })
    }

    try {
        // Verify the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // req.user = decoded; now user can be accessed in routes
        req.user = decoded;
        const userId = req.user.userId;
        next(); // Allow request to proceed
    } catch (error) {
        console.error('JWT verification error:', error);
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
};

module.exports = authMiddleware;