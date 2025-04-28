import React from 'react';
import '../styles/AboutUsPage.css';
import teamworkImage from '../assets/teamwork.jpg';

const AboutUsPage = () => {
  return (
    <div className="about-wrapper">
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
          <p>
            Polycystic Ovary Syndrome (PCOS) is a common hormonal disorder, yet many women are unaware of its impact until later in life. Our platform promotes early self-checks, empowering women to take proactive steps in their health journey.
          </p>

          <h2>Key Features</h2>
          <ul className="highlights">
            <li>AI model for PCOS detection (in development)</li>
            <li>User-friendly interface for easy interaction</li>
            <li>Secure data storage and authentication</li>
            <li>Accessible educational resources</li>
            <li>Cloud-based backend with MongoDB Atlas support</li>
          </ul>

          <p className="thanks">
            Thank you for exploring our platform. We are committed to advancing women's health with technology and awareness.
          </p>
        </div>
        <div className="about-image">
          <img src={teamworkImage} alt="Teamwork" />
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
