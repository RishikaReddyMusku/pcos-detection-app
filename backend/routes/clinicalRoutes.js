const express = require('express');
const router = express.Router();
const { submitClinical, getMyClinicalData } = require('../controllers/clinicalController');
const requireAuth = require('../middleware/requireAuth');

router.post('/submit', requireAuth, submitClinical);
router.get('/me', requireAuth, getMyClinicalData);

module.exports = router;
