// src/pages/UploadScanPage.js
import React, { useState } from 'react';
import axios from '../api/axios';
import '../styles/UploadScanPage.css';

const UploadScanPage = () => {
  const [scan, setScan] = useState(null);
  const [preview, setPreview] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showRedirectMessage, setShowRedirectMessage] = useState(false);


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setScan(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
      setPrediction(null); // reset on new upload
    }
  };

  const handleUpload = async () => {
    if (!scan) {
      alert('Please select a scan image to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', scan);
    const formData1 = new FormData();
    formData1.append('scan', scan);

    try {
      await axios.post('/scan/upload', formData1);
      alert('Scan uploaded successfully!');
    } catch (err) {
      alert('Upload failed');
    }

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5001/predict', formData);

      const { prediction } = response.data;  // Only using prediction
      setPrediction(prediction === 0 ? 'PCOS Detected' : 'Normal');
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-scan-container">
      <h2>📤 Upload Your Ultrasound Scan</h2>

      <div className="upload-section">
        <label htmlFor="scanInput" className="file-label">
          Choose a file
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

        <button onClick={handleUpload} disabled={loading}>
          {loading ? 'Uploading & Predicting...' : 'Upload & Predict'}
        </button>

       {/* Display result */}
       {prediction && (
          <div className="result-box">
            <h3>🔍 Result:</h3>
            <p><strong>Prediction:</strong> {prediction}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadScanPage;
