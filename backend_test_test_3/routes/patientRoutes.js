const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

// Create new patient record
router.post('/patients', patientController.createPatient);

// Get records of all patients in the database
router.get('/patients', patientController.getPatients);

// Update specific patient record by ID
router.put('/patients/:id', patientController.updatePatient);

// Delete a specific patient record by ID
router.delete('/patients/:id', patientController.deletePatient);

module.exports = router;
