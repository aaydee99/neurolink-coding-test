const express = require('express');
const router = express.Router();
const allergyController = require('../controllers/allergyController');

// Create a new allergy
router.post('/allergies', allergyController.createAllergy);

// Retrieve all allergies
router.get('/allergies', allergyController.getAllergies);

// Update an existing allergy
router.put('/allergies/:id', allergyController.updateAllergy);

// Delete an allergy
router.delete('/allergies/:id', allergyController.deleteAllergy);

module.exports = router;
