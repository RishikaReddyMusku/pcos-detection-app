const express = require('express');
const router = express.Router();
const { uploadScan } = require('../controllers/scanController');
<<<<<<< HEAD
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
=======
const requireAuth = require('../middleware/requireAuth');
const upload = require('../middleware/upload');
const axios = require('axios'); // Import axios for HTTP requests
const Scan = require('../models/Scan');
const fs = require('fs');

// Route for uploading scan images
router.post('/upload', requireAuth, upload.single('scan'), async (req, res) => {
  try {
    // After file is uploaded, save it to the database
    const scan = await uploadScan(req,res);

    // Send the file to the Flask server for prediction
    // const formData = new FormData();
    // formData.append('file', req.file.path);  // Append the file to the form data

    const formData = new FormData();
    formData.append('file', fs.createReadStream(scan.filePath)); 

    // Make a POST request to the Flask server for prediction
    const token = localStorage.getItem('token');
    const response = await axios.post('http://127.0.0.1:5001/predict', formData, {
    
      headers: {
        'Content-Type': 'multipart/form-data',  // Required for sending files
        Authorization: `Bearer ${token}`
      },
    });

    // Send the prediction result back to the client
    res.json({
      scan: scan,  // Scan metadata
      prediction: response.data.prediction,  // Prediction from Flask
      confidence: response.data.confidence,  // Confidence of the prediction
    });
  } catch (err) {
    console.error('❌ Error uploading scan:', err);
    res.status(500).json({ error: 'Failed to upload scan' });
  }
});

// Route for fetching user scans
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
>>>>>>> akshitha_branch
