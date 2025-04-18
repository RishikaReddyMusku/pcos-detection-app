
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SymptomsPage.css';
import backgroundImg from '../assets/backgroundimg.jpg';

const SymptomsPage = () => {
  const navigate = useNavigate();

  const handleCheckSymptoms = () => {
    navigate('/symptom-checker');
  };

  return (
    <div className="symptoms-wrapper" style={{ backgroundImage: `url(${backgroundImg})` }}>
      <div className="section">
        <h1>Common PCOS Symptoms</h1>
        <ul className="symptom-list">
          <li>
             <strong>Irregular periods:</strong> Missed, infrequent, or prolonged menstrual cycles due to hormonal imbalances.
          </li>
          <li>
             <strong>Excess facial or body hair:</strong> Often on the face, chest, or back due to elevated androgens.
          </li>
          <li>
             <strong>Acne or oily skin:</strong> Persistent acne that doesn’t respond to traditional treatment.
          </li>
          <li>
             <strong>Weight gain or difficulty losing weight:</strong> Particularly around the abdomen, common in PCOS.
          </li>
          <li>
             <strong>Thinning hair on the scalp:</strong> Hair may become finer or fall out due to hormonal shifts.
          </li>
          <li>
             <strong>Fatigue or low energy:</strong> Constant tiredness or lack of motivation even with proper sleep.
          </li>
        </ul>
      </div>

      <div className="sectionmyths">
        <h2>💬 Myths vs Facts</h2>
        <div className="myth-cards">
          <div className="card">
             <strong>Myth:</strong> Only overweight women get PCOS.
            <br /> <strong>Fact:</strong> PCOS can affect women of all sizes.
          </div>
          <div className="card">
             <strong>Myth:</strong> PCOS means you can’t get pregnant.
            <br /> <strong>Fact:</strong> Many women with PCOS conceive with treatment.
          </div>
          <div className="card">
             <strong>Myth:</strong> PCOS is rare.
            <br /> <strong>Fact:</strong> 1 in 10 women worldwide have PCOS.
          </div>
        </div>
      </div>

      <div className="sectionchecker">
        <h2>Want to know if your symptoms match PCOS?</h2>
        <button className="check-btn" onClick={handleCheckSymptoms}>Check My Symptoms</button>
      </div>
    </div>
  );
};

export default SymptomsPage;
