const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = 3000;

const taskRoutes = require('./routes/Task');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/todo');

app.use(cors());
app.use(express.json());

app.use('/task', taskRoutes);


app.listen(PORT, () => {
    console.log('Server is running');
})