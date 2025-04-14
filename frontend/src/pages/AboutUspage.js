
import React from 'react';
import '../styles/AboutUsPage.css';
import aboutusbg from '../assets/aboutusbg.jpg';



const AboutUsPage = () => {
  return (
    <div className="about-wrapper " >
      <h1>About Us</h1>

      

      <p className="intro">
        We are a group of passionate 3rd-year Computer Science Engineering students from JNTUH University, UCESTH,
        working on a meaningful project aimed at empowering women through awareness and early detection of PCOS.
      </p>

      <p className="mission">
        Our mission is to create an accessible, AI-driven platform for women to understand and take charge of their
        reproductive health using technology. Through our project, we aim to bridge the gap between medical insight and
        digital solutions.
      </p>

      <p>
        PCOS is one of the most common hormonal disorders affecting women globally. Yet, the lack of awareness and late diagnosis
        often complicates the lives of those who suffer. By integrating advanced technology with a friendly user experience,
        our goal is to encourage early self-checks and professional follow-ups.
      </p>

      <h2>Project Highlights</h2>
      <ul className="highlights">
        <li> Clean and beautiful UI designed with care</li>
        <li> Medical form collection and storage using MongoDB</li>
        <li> JWT-based user authentication</li>
        <li> Animated and informative landing and dashboard pages</li>
        <li> Option to upload ultrasound or answer clinical questions</li>
        <li> AI model integration for PCOS detection (in progress)</li>
        <li> Secure cloud backend and MongoDB Atlas support</li>
        <li> Emphasis on education, awareness, and user privacy</li>
      </ul>

      <p>
        We believe technology can be a bridge to better health. Our platform is designed to be intuitive, trustworthy, and informative.
        We thank our mentors and community for supporting us in this endeavor.
      </p>

      <p className="thanks">Thank you for exploring our PCOS Detection System. Your health matters. ❤️</p>
    </div>
  );
};

export default AboutUsPage;