const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const taskRoutes = require('./routes/Task');

dotenv.config({ path: './.env' });

const PORT = process.env.PORT || 3000;

// DB connection
const MONGOOSE_URI = process.env.MONGOOSE_URI || 'mongodb://127.0.0.1:27017/todo';
mongoose.connect(MONGOOSE_URI);

const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use('/task', taskRoutes);

app.listen(PORT, () => {
    console.log('Server is running');
})