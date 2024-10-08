const express = require("express");
const Testimonial = require("../database/models/TestimonialSchema");
const Doctor = require("../database/models/DoctorSchema");


const router = express.Router();
router.get('/doctor', async (req, res) => {
    try {
      const doctor = await Doctor.find({}, { name: 1 });
      res.json(doctor);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
})
// get all testimonials by doctor
router.get('/doctor/:doctorId', async (req, res) => {
    try {
      const doctorId = req.params.doctorId;
      
      // Find all testimonials that match the doctor ID
      const testimonials = await Testimonial.find({ doctor: doctorId }).populate('doctor', 'name'); // Only populate doctor name
  
      if (!testimonials || testimonials.length === 0) {
        return res.status(404).json({ message: 'No testimonials found for this doctor' });
      }
  
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
// create testimonial
router.post('/', async (req, res) => {
    try {
      const newTestimonial = new Testimonial(req.body);
      const savedTestimonial = await newTestimonial.save();
      res.status(201).json(savedTestimonial);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // Get all testimonials
  router.get('/', async (req, res) => {
    try {
        const testimonials = await Testimonial.find().populate('doctor', 'name');
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Get a single testimonial by ID
  router.get('/:id', async (req, res) => {
    try {
      const testimonial = await Testimonial.findById(req.params.id).populate('doctor', 'name');
      if (!testimonial) {
        return res.status(404).json({ message: 'Testimonial not found' });
      }
      res.json(testimonial);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Update a testimonial by ID
  router.put('/:id', async (req, res) => {
    try {
      const updatedTestimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('doctor');
      if (!updatedTestimonial) {
        return res.status(404).json({ message: 'Testimonial not found' });
      }
      res.json(updatedTestimonial);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // Delete a testimonial by ID
  router.delete('/:id', async (req, res) => {
    try {
      const deletedTestimonial = await Testimonial.findByIdAndDelete(req.params.id);
      if (!deletedTestimonial) {
        return res.status(404).json({ message: 'Testimonial not found' });
      }
      res.json({ message: 'Testimonial deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

module.exports = router