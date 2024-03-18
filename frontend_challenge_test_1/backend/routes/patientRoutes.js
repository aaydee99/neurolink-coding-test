const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

// Route for searching patients, linking to the controller
router.get('/search', patientController.searchPatients);
router.post('/add', patientController.addPatient);
router.post('/add/many', patientController.addMultiplePatients);


module.exports = router;
