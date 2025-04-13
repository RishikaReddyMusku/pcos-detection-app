// src/pages/KnowMorePage.js
import React from 'react';
import '../styles/KnowMorePage.css';
import bg from '../assets/simplepinkbg.jpg';

const KnowMorePage = () => {
  return (
          
    
    <div
  className="knowmore-wrapper"
  style={{
    display: 'flex',
    flexDirection: 'column', // important for vertical layout
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundImage: `url(${bg})`, // Removed quotes from CSS property values
    backgroundSize: 'cover', // Corrected 'background-size' syntax
    backgroundPosition: 'center', // Corrected 'background-position' syntax
  }}
>

      <h1> Learn More About PCOS !</h1>

      <div className="info-section">
        <h2>💡 What is PCOS?</h2>
        <p>
          Polycystic Ovary Syndrome (PCOS) is a hormonal disorder causing
          enlarged ovaries with small cysts on the outer edges. It can lead to
          irregular menstrual cycles, infertility, and other health issues.
        </p>
      </div>

      <div className="info-section">
        <h2>🧬 Causes</h2>
        <ul>
          <li>Hormonal imbalance (excess androgens)</li>
          <li>Insulin resistance</li>
          <li>Genetic predisposition</li>
        </ul>
      </div>

      <div className="info-section">
        <h2>⚠️ Health Risks</h2>
        <ul>
          <li>Type 2 Diabetes</li>
          <li>Heart disease</li>
          <li>Endometrial cancer</li>
          <li>Depression & anxiety</li>
        </ul>
      </div>

      <div className="info-section">
        <h2>🌱 Management & Treatment</h2>
        <ul>
          <li>Healthy diet & regular exercise</li>
          <li>Hormonal birth control pills</li>
          <li>Metformin for insulin resistance</li>
          <li>Fertility treatments if needed</li>
        </ul>
      </div>
    </div>
  );
};

export default KnowMorePage;
