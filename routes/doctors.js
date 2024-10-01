const express = require("express");
const Doctor = require("../database/models/DoctorSchema");



const router = express.Router();


router.post('/', async (req, res) => {
    try {
      const doctor = new Doctor(req.body);
      await doctor.save();
      res.status(201).json(doctor);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  // Get all doctors
  router.get('/', async (req, res) => {
    try {
      const doctors = await Doctor.find();
      res.status(200).json(doctors);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Get a doctor by ID
  router.get('/:id', async (req, res) => {
    try {
      const doctor = await Doctor.findById(req.params.id);
      if (!doctor) {
        return res.status(404).json({ error: 'Doctor not found' });
      }
      res.status(200).json(doctor);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Update a doctor by ID
  router.put('/:id', async (req, res) => {
    try {
      const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!doctor) {
        return res.status(404).json({ error: 'Doctor not found' });
      }
      res.status(200).json(doctor);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  // Delete a doctor by ID
  router.delete('/:id', async (req, res) => {
    try {
      const doctor = await Doctor.findByIdAndDelete(req.params.id);
      if (!doctor) {
        return res.status(404).json({ error: 'Doctor not found' });
      }
      res.status(200).json({ message: 'Doctor deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


module.exports = router