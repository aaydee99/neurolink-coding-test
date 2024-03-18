const mongoose = require('mongoose');

const allergySchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true }, // e.g., food, medication, environment
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
  severity: String,
  reactions: [String]
});

module.exports = mongoose.model('Allergy', allergySchema);
