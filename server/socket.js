const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');

let io;

function initSocket(server) {
    io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });

    // Middleware: auth every socket connection
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