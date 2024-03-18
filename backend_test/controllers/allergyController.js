const Allergy = require('../models/Allergy');
const Joi = require('joi');

// Create Allergy
exports.createAllergy = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    type: Joi.string().required(),
    patientId: Joi.string().required(),
    severity: Joi.string().optional(),
    reactions: Joi.array().items(Joi.string()).optional()
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const allergy = new Allergy({
    name: req.body.name,
    type: req.body.type,
    patientId: req.body.patientId,
    severity: req.body.severity,
    reactions: req.body.reactions
  });

  try {
    const savedAllergy = await allergy.save();
    res.send(savedAllergy);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Retrieve Allergies
exports.getAllergies = async (req, res) => {
  try {
    const allergies = await Allergy.find();
    res.send(allergies);
  } catch (err) {
    res.status(500).send({ message: "Error retrieving allergies" });
  }
};

// Update Allergy
exports.updateAllergy = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().optional(),
    type: Joi.string().optional(),
    severity: Joi.string().optional(),
    reactions: Joi.array().items(Joi.string()).optional()
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const allergy = await Allergy.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!allergy) return res.status(404).send({ message: "Allergy not found" });
    res.send(allergy);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Delete Allergy
exports.deleteAllergy = async (req, res) => {
  try {
    const allergy = await Allergy.findByIdAndDelete(req.params.id);
    if (!allergy) return res.status(404).send({ message: "Allergy not found" });
    res.send({ message: "Allergy deleted successfully" });
  } catch (err) {
    res.status(500).send(err);
  }
};

