import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import api from '../api/axios';
import '../styles/MedicalFormPage.css';
import medicalBg from '../assets/medical-bg.jpg';

const MedicalFormPage = () => {
  const navigate = useNavigate();
  const { login } = useUser();

  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    age: '',
    mobile: '',
    email: '',
    bloodGroup: '',
    height: '',
    weight: '',
    vaccination: '',
    reports: ''
  });

  // Calculate age based on date of birth
  useEffect(() => {
    if (formData.dob) {
      const calculateAge = (dob) => {
        const birthDate = new Date(dob);
        const age = new Date().getFullYear() - birthDate.getFullYear();
        const m = new Date().getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && new Date().getDate() < birthDate.getDate())) {
          return age - 1;
        }
        return age;
      };
      setFormData({ ...formData, age: calculateAge(formData.dob) });
    }
  }, [formData.dob]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await api.post('/api/form', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      localStorage.setItem('medicalProfile', JSON.stringify({
        age: formData.age,
        height: formData.height,
        weight: formData.weight,
        bloodGroup: formData.bloodGroup
      }));

      console.log('Form submitted:', response.data);
      navigate('/dashboard');
    } catch (err) {
      console.error('Submission error:', err.response?.data || err.message);
      alert('Error submitting form. Please try again.');
    }
  };

  return (
    <div className="medical-form-wrapper" style={{ backgroundImage: `url(${medicalBg})` }}>
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <form className="medical-form" onSubmit={handleSubmit} autoComplete="off">
          <h2>Medical Information</h2>

          {/* Render form inputs */}
          {Object.entries(formData).map(([key, value]) => {
            if (key === 'vaccination' || key === 'reports') {
              return (
                <textarea
                  key={key}
                  name={key}
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                  value={value}
                  onChange={handleChange}
                  rows={3}
                  className="form-control"
                />
              );
            }

            if (key === 'dob') {
              return (
                <input
                  key={key}
                  type="date"
                  name={key}
                  value={value}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              );
            }

            if (key === 'age') {
              return (
                <input
                  key={key}
                  type="text"
                  name={key}
                  value={value}
                  placeholder="Age (Auto-calculated)"
                  disabled
                  className="form-control"
                />
              );
            }

            if (key === 'bloodGroup') {
              return (
                <select
                  key={key}
                  name={key}
                  value={value}
                  onChange={handleChange}
                  required
                  className="form-control"
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              );
            }

            if (key === 'height') {
              return (
                <input
                  key={key}
                  type="number"
                  name={key}
                  placeholder="Height (in cm)"
                  value={value}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              );
            }

            if (key === 'weight') {
              return (
                <input
                  key={key}
                  type="number"
                  name={key}
                  placeholder="Weight"
                  value={value}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              );
            }

            return (
              <input
                key={key}
                type={key === 'email' ? 'email' : 'text'}
                name={key}
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                value={value}
                onChange={handleChange}
                required
                className="form-control"
              />
            );
          })}

          <button type="submit" className="btn btn-dark w-100">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default MedicalFormPage;
