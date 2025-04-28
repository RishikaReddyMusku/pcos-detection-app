const express = require('express');
const router = express.Router();
const { uploadScan } = require('../controllers/scanController');
const requireAuth = require('../middleware/requireAuth');
const upload = require('../middleware/upload');
const axios = require('axios'); // Import axios for HTTP requests
const Scan = require('../models/Scan');
const fs = require('fs');
const path = require('path');

// Route for uploading scan images
router.post('/upload', requireAuth, upload.single('scan'), async (req, res) => {
  const userId = req.user.id;
  const file = req.file;

  if (!file) return res.status(400).json({ error: 'No file uploaded' });

  try {
    const originalPath = file.path;
    const compressedFileName = `compressed-${file.filename}`;
    const compressedPath = path.join('uploads', 'scans', compressedFileName);
    const stats = fs.statSync(originalPath);
    const fileSizeInMB = stats.size / (1024 * 1024);

    console.log(`Original file size: ${fileSizeInMB.toFixed(2)} MB`);

    let finalPath = originalPath;
    let finalFileName = file.filename;

    if (fileSizeInMB > 5) {
      console.log("⚙️ Compressing large scan image...");

      await sharp(originalPath)
        .resize({ width: 1024 })
        .jpeg({ quality: 70 })
        .toFile(compressedPath);

      // ✅ Delete the original file safely
      fs.unlink(originalPath, (err) => {
        if (err) console.warn('⚠️ Could not delete original image:', err.message);
        else console.log("🗑️ Original image deleted after compression.");
      });

      finalPath = compressedPath;
      finalFileName = compressedFileName;
    }

    const scan = new Scan({
      userId,
      filePath: finalPath,
      fileName: finalFileName,
    });

    await scan.save();

    // Now after saving scan, send it properly
    res.status(201).json({ message: 'Scan uploaded successfully', scan });

  } catch (error) {
    console.error('❌ Error saving scan:', error);
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
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const scan = await Scan.findById(req.params.id);
    if (!scan) return res.status(404).json({ error: 'Scan not found' });

    const filePath = scan.filePath;

    // Delete from file system
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Correct way: Delete from database
    await Scan.findByIdAndDelete(req.params.id);

    res.json({ message: 'Scan deleted successfully' });
  } catch (err) {
    console.error('❌ Error deleting scan:', err);
    res.status(500).json({ error: 'Failed to delete scan' });
  }
});



module.exports = router;