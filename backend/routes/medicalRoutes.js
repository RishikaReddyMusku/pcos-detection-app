// backend/routes/form.js
const express = require('express');
const router = express.Router();
const MedicalForm = require('../models/MedicalForm');
const requireAuth = require('../middleware/requireAuth');
const { submitMedicalForm } = require('../controllers/medicalController');

// Submit medical form (protected route)
router.post('/', requireAuth, submitMedicalForm);

// Get logged-in user's latest medical form
router.get('/me', requireAuth, async (req, res) => {
  try {
    const form = await MedicalForm.findOne({ user: req.user._id }).sort({ createdAt: -1 });
    if (!form) return res.status(404).json({ message: 'No medical form found' });
    res.json(form);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});
// Add this in medicalroutes.js
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const updatedForm = await MedicalForm.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedForm) return res.status(404).json({ message: 'Medical form not found' });

    res.json(updatedForm);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;
