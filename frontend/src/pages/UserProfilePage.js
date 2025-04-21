// src/pages/UserProfilePage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import '../styles/UserProfilePage.css';

const UserProfilePage = () => {
  const [medicalForm, setMedicalForm] = useState(null);
  const [symptoms, setSymptoms] = useState([]);
  const [clinicalData, setClinicalData] = useState([]);
  const [scans, setScans] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchAll = async () => {
      try {
        const [formRes, symptomRes, clinicalRes, scanRes] = await Promise.all([
          api.get('/api/form/me', { headers: { Authorization: `Bearer ${token}` } }),
          api.get('/symptoms/me', { headers: { Authorization: `Bearer ${token}` } }),
          api.get('/clinical/me', { headers: { Authorization: `Bearer ${token}` } }),
          api.get('/scan/me', { headers: { Authorization: `Bearer ${token}` } })
        ]);

        setMedicalForm(formRes.data);
        setSymptoms(symptomRes.data);
        setClinicalData(clinicalRes.data); // assumes object, not array
        setScans(scanRes.data);
        console.log("Clinical Data: ", clinicalRes.data);
      } catch (err) {
        alert('Could not load full profile.');
        console.error(err);
      }
    };

    fetchAll();
  }, []);

  return (
    <div className="profile-wrapper">
      <h1>🩺 Your Medical Profile</h1>

      {/* Medical Form */}
      {medicalForm ? (
        <div className="profile-card">
          {Object.entries(medicalForm).map(([key, value]) =>
            ['_id', '__v', 'user'].includes(key) ? null : (
              <p key={key}>
                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
              </p>
            )
          )}
        </div>
      ) : (
        <p>Loading your details...</p>
      )}

      {/* Symptoms */}
      {symptoms.length > 0 && (
  <>
  <br></br>
    <h2>🩹 PCOS Symptoms</h2>
    {symptoms.map((symptom, i) => (
      <div key={i} className="profile-card">
        {Object.entries(symptom).map(([key, value]) =>
          ['_id', '__v', 'userId', 'submittedAt'].includes(key) ? null : (
            <p key={key}><strong>{key}:</strong> {value}</p>
          )
        )}
      </div>
    ))}
  </>
)}


      {/* Clinical Info */}
      {clinicalData.length > 0 && (
  <>
  <br></br>
    <h2>🧬 Clinical Information</h2>
    {clinicalData.map((entry, i) => (
      <div key={i} className="profile-card">
        {Object.entries(entry.bloodTest || {}).map(([key, value]) => (
          <p key={key}><strong>{key}:</strong> {value}</p>
        ))}
        {Object.entries(entry.reproductiveHealth || {}).map(([key, value]) => (
          <p key={key}><strong>{key}:</strong> {value}</p>
        ))}
        {Object.entries(entry.bodyMetrics || {}).map(([key, value]) => (
          <p key={key}><strong>{key}:</strong> {value}</p>
        ))}
        {Object.entries(entry.lifestyleAndSymptoms || {}).map(([key, value]) => (
          <p key={key}><strong>{key}:</strong> {value}</p>
        ))}
      </div>
    ))}
  </>
)}


      {/* Scans */}
      {scans.length > 0 && (
  <>
  <br></br>
    <h2>📁 Uploaded Scans</h2>
    <div className="scans-wrapper">
      {scans.map((scan, i) => (
        <div key={i} className="scan-preview">
          <img src={`http://localhost:5000/${scan.filePath}`} alt={`Scan ${i}`} />
          <p>{scan.fileName}</p>
        </div>
      ))}
    </div>
  </>
)}


      <button className="back-button" onClick={() => navigate('/dashboard')}>
        ← Back to Dashboard
      </button>
    </div>
  );
};

export default UserProfilePage;
