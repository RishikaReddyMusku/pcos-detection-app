// src/pages/UserProfilePage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import '../styles/UserProfilePage.css';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const UserProfilePage = () => {
  const [medicalForm, setMedicalForm] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedForm, setEditedForm] = useState({});
  const [symptoms, setSymptoms] = useState([]);
  const [clinicalData, setClinicalData] = useState(null);
  const [scans, setScans] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchMedicalForm = async () => {
      try {
        const formRes = await api.get('/api/form/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMedicalForm(formRes.data);
        setEditedForm(formRes.data);
      } catch (err) {
        console.error('Failed to load medical form:', err);
        alert('Could not load your medical form.');
      }
    };

    const fetchSymptoms = async () => {
      try {
        const symptomRes = await api.get('/symptoms/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSymptoms(symptomRes.data);
      } catch (err) {
        console.warn('No symptoms found.');
      }
    };

    const fetchClinicalData = async () => {
      try {
        const clinicalRes = await api.get('/clinical/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setClinicalData(clinicalRes.data);
      } catch (err) {
        console.warn('No clinical data found.');
      }
    };

    const fetchScans = async () => {
      try {
        const scanRes = await api.get('/scan/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setScans(scanRes.data);
      } catch (err) {
        console.warn('No scans found.');
      }
    };

    fetchMedicalForm();
    fetchSymptoms();
    fetchClinicalData();
    fetchScans();
  }, []);

  const handleEditChange = (e) => {
    setEditedForm({ ...editedForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      await api.put(`/api/form/${medicalForm._id}`, editedForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMedicalForm(editedForm);
      setEditMode(false);
      alert('Medical form updated successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to update medical form.');
    }
  };

  const handleDeleteScan = async (scanId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this scan?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token');
      await api.delete(`/scan/${scanId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setScans(scans.filter(scan => scan._id !== scanId));
      alert('Scan deleted successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to delete scan.');
    }
  };

  return (
    <div className="profile-wrapper">
      <h1>🩺 Your Medical Profile</h1>

      {/* Medical Form (Always visible) */}
      {medicalForm ? (
        <div className="profile-card medical-form-card">
          {editMode ? (
            <>
              {Object.entries(medicalForm).map(([key, value]) =>
                ['_id', '__v', 'userId', 'user', 'createdAt', 'updatedAt'].includes(key) ? null : (
                  <div key={key} className="edit-field">
                    <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                    <input
                      type="text"
                      name={key}
                      value={editedForm[key] || ''}
                      onChange={handleEditChange}
                    />
                  </div>
                )
              )}
              <button className="save-button" onClick={handleEditSubmit}>Save Changes</button>
              <button className="cancel-button" onClick={() => setEditMode(false)}>Cancel</button>
            </>
          ) : (
            <>
              {Object.entries(medicalForm).map(([key, value]) =>
                ['_id', '__v', 'userId', 'user', 'createdAt', 'updatedAt'].includes(key) ? null : (
                  <p key={key}>
                    <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                  </p>
                )
              )}
              <button className="edit-icon-button" onClick={() => setEditMode(true)} title="Edit">
                <FaEdit />
              </button>
            </>
          )}
        </div>
      ) : (
        <p>Loading your medical details...</p>
      )}

      {/* Symptoms */}
      {symptoms.length > 0 && (
        <>
          <br />
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
      {clinicalData && (
        <>
          <br />
          <h2>🧬 Clinical Information</h2>
          <div className="profile-card">
            {Object.entries(clinicalData.bloodTest || {}).map(([key, value]) => (
              <p key={key}><strong>{key}:</strong> {value}</p>
            ))}
            {Object.entries(clinicalData.reproductiveHealth || {}).map(([key, value]) => (
              <p key={key}><strong>{key}:</strong> {value}</p>
            ))}
            {Object.entries(clinicalData.bodyMetrics || {}).map(([key, value]) => (
              <p key={key}><strong>{key}:</strong> {value}</p>
            ))}
            {Object.entries(clinicalData.lifestyleAndSymptoms || {}).map(([key, value]) => (
              <p key={key}><strong>{key}:</strong> {value}</p>
            ))}
          </div>
        </>
      )}

      {/* Scans */}
      {scans.length > 0 && (
        <>
          <br />
          <h2>📁 Uploaded Scans</h2>
          <div className="scans-wrapper">
            {scans.map((file, i) => (
              <div key={i} className="scan-preview">
                <div className="scan-wrapper">
                  <div className="scan-image-container">
                    <img
                      src={`https://pcos-backend-mu9b.onrender.com/${file.filePath}`}
                      alt={`Scan ${i}`}
                      onClick={() => setSelectedImageIndex(i)}
                      className="clickable-scan"
                    />
                    <button
                      className="delete-icon-button"
                      onClick={() => handleDeleteScan(file._id)}
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                  <p>{file.fileName}</p>
                </div>
              </div>
            ))}
          </div>

          {selectedImageIndex !== null && (
            <div className="modal-overlay" onClick={() => setSelectedImageIndex(null)}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <img
                  src={`https://pcos-backend-mu9b.onrender.com/${scans[selectedImageIndex].filePath}`}
                  alt="Enlarged Scan"
                />
                <button className="close-button" onClick={() => setSelectedImageIndex(null)}>X</button>
                <button
                  className="nav-button left"
                  onClick={() =>
                    setSelectedImageIndex((selectedImageIndex - 1 + scans.length) % scans.length)
                  }
                >
                  ⬅️
                </button>
                <button
                  className="nav-button right"
                  onClick={() =>
                    setSelectedImageIndex((selectedImageIndex + 1) % scans.length)
                  }
                >
                  ➡️
                </button>
              </div>
            </div>
          )}
        </>
      )}

      <button className="back-button" onClick={() => navigate('/dashboard')}>
        ← Back to Dashboard
      </button>
    </div>
  );
};

export default UserProfilePage;
