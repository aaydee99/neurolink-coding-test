const mongoose = require('mongoose');

const medicationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true }, // e.g., prescription, over-the-counter
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
    dosage: String,
    frequency: String
});

module.exports = mongoose.model('Medication', medicationSchema);
