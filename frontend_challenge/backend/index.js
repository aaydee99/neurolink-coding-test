require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const patientRoutes = require('./routes/patientRoutes');
const cors = require('cors');

const app = express();

connectDB(); // Connect to MongoDB

app.use(cors());
app.use(express.json());

app.use('/', patientRoutes); // Use patient routes

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
