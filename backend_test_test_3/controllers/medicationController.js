const Medication = require('../models/Medication');
const Joi = require('joi');

// Create a new medication record
exports.createMedication = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    type: Joi.string().required(),
    patientId: Joi.string().required(),
    dosage: Joi.string().optional(),
    frequency: Joi.string().optional()
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const medication = new Medication({
    name: req.body.name,
    type: req.body.type,
    patientId: req.body.patientId,
    dosage: req.body.dosage,
    frequency: req.body.frequency
  });

  try {
    const savedMedication = await medication.save();
    res.send(savedMedication);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Retrieve all medication records with pagination and optional filtering
exports.getMedications = async (req, res) => {
  const { page = 1, limit = 10, name, type, patientId } = req.query;
  const query = {};
  if (name) query.name = { $regex: name, $options: 'i' };
  if (type) query.type = type;
  if (patientId) query.patientId = patientId;

  try {
    const medications = await Medication.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Medication.countDocuments(query);
    res.json({
      medications,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

// Update a medication record
exports.updateMedication = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().optional(),
    type: Joi.string().optional(),
    dosage: Joi.string().optional(),
    frequency: Joi.string().optional()
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const medication = await Medication.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!medication) return res.status(404).send("The medication with the given ID was not found.");
    res.send(medication);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Delete a medication record
exports.deleteMedication = async (req, res) => {
  try {
    const medication = await Medication.findByIdAndRemove(req.params.id);
    if (!medication) return res.status(404).send("The medication with the given ID was not found.");
    res.send(medication);
  } catch (err) {
    res.status(500).send(err);
  }
};
