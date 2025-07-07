require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

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

// Routes
const productRoutes = require('./routes/productRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);
const PORT = 5000;

mongoose
    .connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("MongoDB connected!")
        app.get('/', (req, res)=> res.send('Hello from Dockerized Node.js with MongoDB!'));
    })
    .catch((err) => {
        console.log("MongoDB connection error:", err)
        process.exit(1);
    });

app.listen(PORT, () => console.log(`Server is running on http:localhost:${PORT}`));
