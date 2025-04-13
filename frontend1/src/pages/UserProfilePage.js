// src/pages/UserProfilePage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import '../styles/UserProfilePage.css';

const UserProfilePage = () => {
  const [medicalForm, setMedicalForm] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMedicalForm = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await api.get('/api/form/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMedicalForm(res.data);
      } catch (err) {
        alert('Could not load user info.');
        console.error(err);
      }
    };
    fetchMedicalForm();
  }, []);

  return (
    <div className="profile-wrapper">
      <h1>🩺 Your Medical Profile</h1>

      {medicalForm ? (
        <div className="profile-card">
          {Object.entries(medicalForm).map(([key, value]) => (
            key !== '_id' && key !== '__v' && key !== 'user' && (
              <p key={key}>
                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
              </p>
            )
          ))}
        </div>
      ) : (
        <p>Loading your details...</p>
      )}

      <button className="back-button" onClick={() => navigate('/dashboard')}>
        ← Back to Dashboard
      </button>
    </div>
  );
};

export default UserProfilePage;
