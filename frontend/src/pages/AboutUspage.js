import React from 'react';
import '../styles/AboutUsPage.css';
import bg from '../assets/aboutus.jpg';

const AboutUsPage = () => {
  return (
    <div className="about-wrapper" style={{backgroundImage : `url(${bg})`,backgroundSize: 'cover',
    backgroundPosition: 'center'}}>
      <div className="about-content">
        <div className="about-text">
          <h1>About Us</h1>

          <p className="intro">
            We are a team of third-year Computer Science Engineering students from JNTUH University, UCESTH, working on a project to empower women through the awareness and early detection of PCOS.
          </p>

          <p className="mission">
            Our mission is to create an AI-driven platform that provides women with the tools to better understand and manage their reproductive health. By bridging technology with healthcare, we aim to facilitate early detection and self-awareness of PCOS.
          </p>


          <h2>Why PCOS Matters</h2>
          <p className="pcos-info">
            Polycystic Ovary Syndrome (PCOS) is a common hormonal disorder, yet many women are unaware of its impact until later in life.PCOS affects about 1 in 10 women globally, making it one of the most common endocrine disorders in women. Despite its commonality, it's often underdiagnosed, leading to untreated symptoms and long-term health risks. Our platform promotes early self-checks, empowering women to take proactive steps in their health journey.
          </p>

          <h2>Key Features</h2>
          <ul className="highlights">
            <li>AI Integration for PCOS detection based on ultrasound scan predictions (Keras) and clinical question-based predictions (CatBoost).</li>
            <li>Informational Content about PCOS, including its causes, symptoms, health risks, and management.</li>
            <li>Secure data storage and authentication</li>
            <li>Personalized Lifestyle and Medical Recommendations based on user input.</li>
            <li>Authentication & User Data Management with JWT authentication and MongoDB for secure data storage.</li>
            <li>Real-time Recommendations processed based on user input for immediate next steps.

</li><li>Personalized Symptom Checker to input symptoms and get test recommendations.</li>
<li>User-Friendly Interface with easy navigation and a clean design.</li>
          </ul>
          <br></br>

          <p className="thanks">
            Thank you for exploring our platform. We are committed to advancing women's health with technology and awareness.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
