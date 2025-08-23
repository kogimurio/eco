const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');

let io;

function initSocket(server) {
    // ✅ Initialize a new Socket.IO server instance, Allow all origins, Accept only GET and POST methods
    io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });

    // 🛡️ Middleware to authenticate every new socket connection
    // - Extract the JWT token from the handshake (socket.handshake.auth.token)
    // - If no token, reject the connection
    // - If valid, attach the decoded payload (user info, role, email, userId) to socket.user
    // - If invalid, throw an authentication error
    io.use((socket, next) => {
        const token = socket.handshake.auth.token;
        if (!token) return next(new Error("❌ No token provided"));

        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            socket.user = payload;
            next();
        } catch (error) {
            next(new Error("❌ Invalid token"));
        }
    });
    
    // 🎧 Handle a new client connection
    // - Log when a socket successfully connects
    // - If the connected user is an admin:
    //     → Add them to the special "admins" room
    //     → Log which admin joined
    io.on("connection", (socket) => {
        console.log("✅ Socket connected:", socket.id);

        if (socket.user.role === 'admin') {
            socket.join("admins");
            console.log(`🔐 ${socket.user.email} joined admin room`);
        };
    });

    return io;
}

function getIO() {
    if (!io) {
        throw new Error("❌ Socket.io not initialized! Call initSocket first.");
    }
    return io;
}

module.exports = { initSocket, getIO };