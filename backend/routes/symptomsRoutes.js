const express = require('express');
const router = express.Router();
const { submitSymptoms } = require('../controllers/symptomsController');
const requireAuth = require('../middleware/requireAuth'); // Middleware to authenticate user
const Symptom = require('../models/Symptom');

router.post('/check', requireAuth, submitSymptoms);
router.get('/me', requireAuth, async (req, res) => {
    try {
      const symptoms = await Symptom.find({ userId: req.user.id });
      res.json(symptoms);
    } catch (err) {
      console.error('❌ Error fetching symptoms:', err); // ✅ Add this
      res.status(500).json({ error: 'Failed to fetch symptoms' });
    }
  });
  

module.exports = router;