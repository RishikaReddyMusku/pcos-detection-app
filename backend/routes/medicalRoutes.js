// backend/routes/form.js
const express = require('express');
const router = express.Router();
const MedicalForm = require('../models/MedicalForm');
const requireAuth = require('../middleware/requireAuth');

// Submit medical form (protected route)
router.post('/', requireAuth, async (req, res) => {
  try {
    const form = new MedicalForm({
      user: req.user._id,
      ...req.body
    });

    await form.save();
    res.status(201).json({ message: 'Medical form submitted successfully', form });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

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

module.exports = router;
