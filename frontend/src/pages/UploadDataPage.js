// src/pages/UploadDataPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/UploadDataPage.css';
import heartbg from '../assets/heartsteth.jpg';


const UploadDataPage = () => {
  const navigate = useNavigate();

  return (
    <div className="upload-wrapper" style={{ backgroundImage: `url(${heartbg})` }}>
      <div className="wholematter">
      <div className="upload-intro">
        <h1> Help Us Detect PCOS</h1>
        <p>
          To provide a precise diagnosis, we need medical data. Rest assured, your information remains confidential and is only used for PCOS detection purposes.
        </p>
        <ul>
          <li>🔐 All uploads are secure and private.</li>
          <li>⚙️ You can choose your preferred method below.</li>
        </ul>
      </div>

      <div className="upload-options">
        <div className="option-card" onClick={() => navigate('/upload-scan')}>
          🩻 <h3>Upload Ultrasound Scan</h3>
          <p>Use AI to detect PCOS by uploading your ovarian ultrasound image.</p>
        </div>

        <div className="option-card" onClick={() => navigate('/clinical-questions')}>
          📝 <h3>Answer Clinical Questions</h3>
          <p>Let our AI analyze your symptoms and medical inputs to detect PCOS.</p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default UploadDataPage;
