require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const productRoutes = require('./routes/productRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);
const PORT = 5000;

mongoose
    .connect(process.env.MONGO_URL, {
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
