const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  firstName: { type: String, required: true }, // First Name of patient
  lastName: { type: String, required: true }, // Last Name of patient
  dateOfBirth: { type: Date, required: true }, // Date of birth of the patient
  email: { type: String, required: true, unique: true }, //Email of patient
  phone: String, // Phone number of patient (Optional)
  address: String  // Address of patient (Optional)
});

module.exports = mongoose.model('Patient', patientSchema);
