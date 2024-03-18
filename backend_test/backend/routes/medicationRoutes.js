const express = require('express');
const router = express.Router();
const medicationController = require('../controllers/medicationController');

// Create a new medication record
router.post('/medications', medicationController.createMedication);

// Retrieve medication records with optional filtering, pagination
router.get('/medications', medicationController.getMedications);

// Update a specific medication record by ID
router.put('/medications/:id', medicationController.updateMedication);

// Delete a specific medication record by ID
router.delete('/medications/:id', medicationController.deleteMedication);

module.exports = router;
