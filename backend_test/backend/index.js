require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const medicationRoutes = require('./routes/medicationRoutes');
const allergyRoutes = require('./routes/allergyRoutes');
const patientRoutes = require('./routes/patientRoutes');


const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(express.json()); // for parsing application/json
app.use(cors()); // Use CORS middleware to enable cross-origin requests


// Routes
app.use('/api', medicationRoutes);
app.use('/api', allergyRoutes);
app.use('/api', patientRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Hello, your API is running!');
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server running on port ${port}...`));
