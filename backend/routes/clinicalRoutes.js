const express = require('express');
const router = express.Router();
const { submitClinical } = require('../controllers/clinicalController');
const requireAuth = require('../middleware/requireAuth'); // Middleware to authenticate user
const Clinical = require('../models/Clinical');

router.post('/submit', requireAuth, submitClinical);
router.get('/me', requireAuth, async (req, res) => {
    try {
      const clinical = await Clinical.find({ userId: req.user.id }); // ✅ Correct model
      res.json(clinical);
    } catch (err) {
      console.error('❌ Error fetching clinical:', err);
      res.status(500).json({ error: 'Failed to fetch clinical data' });
    }
  });
  
module.exports = router;