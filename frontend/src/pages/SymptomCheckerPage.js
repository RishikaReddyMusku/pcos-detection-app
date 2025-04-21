// src/pages/SymptomCheckerPage.js
import React, { useState } from 'react';
import axios from '../api/axios';
import '../styles/SymptomCheckerPage.css';

const SymptomCheckerPage = () => {
  const [formData, setFormData] = useState({
    marriageYears: '',
    weightGain: '',
    hairGrowth: '',
    skinDarkening: '',
    hairLoss: '',
    pimples: '',
    fastFood: '',
    exercise: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/symptoms/check', formData);
      alert('Symptoms submitted successfully!');
    } catch (error) {
      alert('Failed to submit symptoms');
    }
  };

  return (
    <div className="symptom-checker-container">
      <h2>Check Your PCOS Symptoms</h2>
      <form className="symptom-form" onSubmit={handleSubmit}>
        <label>
          Marriage Status (Years)
          <input
            type="number"
            name="marriageYears"
            placeholder="e.g. 2"
            value={formData.marriageYears}
            onChange={handleChange}
          />
        </label>

        <label>
          Weight Gain (Y/N)
          <select name="weightGain" value={formData.weightGain} onChange={handleChange}>
            <option value="">--Select--</option>
            <option value="Y">Yes</option>
            <option value="N">No</option>
          </select>
        </label>

        <label>
          Hair Growth (Y/N)
          <select name="hairGrowth" value={formData.hairGrowth} onChange={handleChange}>
            <option value="">--Select--</option>
            <option value="Y">Yes</option>
            <option value="N">No</option>
          </select>
        </label>

        <label>
          Skin Darkening (Y/N)
          <select name="skinDarkening" value={formData.skinDarkening} onChange={handleChange}>
            <option value="">--Select--</option>
            <option value="Y">Yes</option>
            <option value="N">No</option>
          </select>
        </label>

        <label>
          Hair Loss (Y/N)
          <select name="hairLoss" value={formData.hairLoss} onChange={handleChange}>
            <option value="">--Select--</option>
            <option value="Y">Yes</option>
            <option value="N">No</option>
          </select>
        </label>

        <label>
          Pimples (Y/N)
          <select name="pimples" value={formData.pimples} onChange={handleChange}>
            <option value="">--Select--</option>
            <option value="Y">Yes</option>
            <option value="N">No</option>
          </select>
        </label>

        <label>
          Fast Food Consumption (Y/N)
          <select name="fastFood" value={formData.fastFood} onChange={handleChange}>
            <option value="">--Select--</option>
            <option value="Y">Yes</option>
            <option value="N">No</option>
          </select>
        </label>

        <label>
          Regular Exercise (Y/N)
          <select name="exercise" value={formData.exercise} onChange={handleChange}>
            <option value="">--Select--</option>
            <option value="Y">Yes</option>
            <option value="N">No</option>
          </select>
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SymptomCheckerPage;
