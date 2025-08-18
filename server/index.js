require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const testRoutes = require('./routes/testRoutes');
const http = require("http");
const { initSocket } = require("./socket");

const app = express();
const server = http.createServer(app);

initSocket(server);

// Static assets
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const allowedOrigin = process.env.NODE_ENV === 'production'
  ? 'https://fashionova-frontend.vercel.app'
  : 'http://localhost:3000';

app.use(cors({
  origin: allowedOrigin,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const cartRouter = require('./routes/cartRoutes');
const address = require('./routes/addressRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const orderRoutes = require('./routes/orderRoutes');

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/test', testRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/cart', cartRouter);
app.use('/api/address', address);
app.use('/api/mpesa', paymentRoutes);
app.use('/api/orders', orderRoutes);

// ✅ Global error handler (place this **after** all routes!)
app.use((err, req, res, next) => {
  console.error('🔥 Global error handler:', err);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

// MongoDB
const MONGO_URL = 
    process.env.USE_DB_SOURCE === 'docker'
    ? process.env.MONGO_URL_DOCKER
    : process.env.USE_DB_SOURCE === 'atlas'
    ? process.env.MONGO_URL_ATLAS
    : process.env.MONGO_URL_LOCAL;

if (!MONGO_URL) {
    console.error("MongoDB connection string is not defined in .env file");
    process.exit(1);
}

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected!");
    app.get('/', (req, res) => res.send('Hello from Dockerized Node.js with MongoDB!'));
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
    process.exit(1);
  });

// Start server
const PORT = 5000;
server.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));

