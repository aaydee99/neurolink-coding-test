const Patient = require('../models/Patient');

// Async handler to avoid repetitive try-catch
const asyncHandler = require('express-async-handler');

exports.searchPatients = asyncHandler(async (req, res) => {
    const searchTerm = req.query.q;
    try {
        const results = await Patient.find({ name: { $regex: searchTerm, $options: 'i' } });
        res.json(results);
    } catch (error) {
        res.status(500).send("Error fetching patients");
    }
});

exports.addPatient = async (req, res) => {
    try {
        const { name, age, condition } = req.body;

        // Simple validation
        if (!name) {
            return res.status(400).json({ message: 'Name is required' });
        }

        const newPatient = new Patient({
            name,
            age,
            condition,
        });

        const savedPatient = await newPatient.save();

        res.status(201).json(savedPatient);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
exports.addMultiplePatients = async (req, res) => {
    try {
      const patients = req.body; // Expecting an array of patient objects
      const newPatients = await Patient.insertMany(patients);
      res.status(201).json(newPatients);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error', error: error.message });
    }
  };
  
