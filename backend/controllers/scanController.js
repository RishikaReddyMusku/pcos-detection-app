const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const Scan = require('../models/Scan');

exports.uploadScan = async (req, res) => {
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

      // ✅ Safely delete the original file without crashing
      fs.unlink(originalPath, (err) => {
        if (err) {
          console.warn('⚠️ Could not delete original image:', err.message);
        } else {
          console.log("🗑️ Original image deleted after compression.");
        }
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
    res.status(201).json({ message: 'Scan uploaded successfully', scan });

  } catch (error) {
    console.error('❌ Error saving scan:', error);
    res.status(500).json({ error: 'Failed to upload scan' });
  }
};