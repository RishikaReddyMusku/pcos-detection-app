// src/pages/UploadScanPage.js
import React, { useState } from 'react';
import axios from '../api/axios';
import '../styles/UploadScanPage.css';

const UploadScanPage = () => {
  const [scan, setScan] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setScan(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!scan) {
      alert('Please select a scan image to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('scan', scan);

    try {
      await axios.post('/scan/upload', formData);
      alert('Scan uploaded successfully!');
    } catch (err) {
      alert('Upload failed');
    }
  };

  return (
    <div className="upload-scan-container">
      <h2>📤 Upload Your Ultrasound Scan</h2>

      <div className="upload-section">
        <label htmlFor="scanInput" className="file-label">
          {scan ? scan.name : 'Choose a file'}
        </label>
        <input
          id="scanInput"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />

        {preview && (
          <div className="preview-box">
            <img src={preview} alt="Preview" />
          </div>
        )}

        <button onClick={handleUpload}>Upload</button>
      </div>
    </div>
  );
};

export default UploadScanPage;
