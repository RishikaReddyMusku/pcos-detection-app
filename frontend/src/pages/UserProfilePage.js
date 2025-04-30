// src/pages/UserProfilePage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import '../styles/UserProfilePage.css';
import { FaEdit } from 'react-icons/fa'; // at top of UserProfilePage.js
import { FaTrashAlt } from 'react-icons/fa';




const UserProfilePage = () => {
  const [medicalForm, setMedicalForm] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedForm, setEditedForm] = useState({});
  const [symptoms, setSymptoms] = useState([]);
  const [clinicalData, setClinicalData] = useState([]);
  const [scans, setScans] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);



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
        setEditedForm(formRes.data);
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

      {/* Medical Form */}
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
      {clinicalData > 0 && (
  <>
  <br></br>
    <h2>🧬 Clinical Information</h2>
    {/* {clinicalData.map((entry, i) => (
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
    ))} */}

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
  <br></br>
    <h2>📁 Uploaded Scans</h2>
    <div className="scans-wrapper">
    {scans.map((file, i) => (
  <div key={i} className="scan-preview">
    <div className="scan-wrapper">
      <div className="scan-image-container">
        <img
          src={`http://localhost:5000/${file.filePath}`}
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
        src={`http://localhost:5000/${scans[selectedImageIndex].filePath}`}
        alt="Enlarged Scan"
      />
      <button className="close-button" onClick={() => setSelectedImageIndex(null)}>X</button>

      {/* Navigation Buttons */}
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
