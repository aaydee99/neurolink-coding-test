const Patient = require('../models/Patient');
const Joi = require('joi');

// Create a new patient
exports.createPatient = async (req, res) => {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    dateOfBirth: Joi.date().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().optional(),
    address: Joi.string().optional()
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const patient = new Patient(req.body);
  try {
    const savedPatient = await patient.save();
    res.send(savedPatient);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Retrieve all patients
exports.getPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.send(patients);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Update a patient
exports.updatePatient = async (req, res) => {
  const { error } = Joi.object({
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
    dateOfBirth: Joi.date().optional(),
    email: Joi.string().email().optional(),
    phone: Joi.string().optional(),
    address: Joi.string().optional()
  }).validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!patient) return res.status(404).send("The patient with the given ID was not found.");
    res.send(patient);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Delete a patient
exports.deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndRemove(req.params.id);
    if (!patient) return res.status(404).send("The patient with the given ID was not found.");
    res.send(patient);
  } catch (err) {
    res.status(500).send(err);
  }
};
