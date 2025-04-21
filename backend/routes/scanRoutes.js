const express = require('express');
const router = express.Router();
const { uploadScan } = require('../controllers/scanController');
const requireAuth = require('../middleware/requireAuth'); // Middleware to authenticate user
const upload = require('../middleware/upload');
const Scan = require('../models/Scan');
router.post('/upload', requireAuth, upload.single('scan'), uploadScan);
router.get('/me', requireAuth, async (req, res) => {
    try {
      const scans = await Scan.find({ userId: req.user.id });
      res.json(scans);
    } catch (err) {
      console.error('❌ Error fetching scans:', err);
      res.status(500).json({ error: 'Failed to fetch scans' });
    }
  });

module.exports = router;