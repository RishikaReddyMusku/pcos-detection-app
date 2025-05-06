
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useUser } from '../context/UserContext';
import '../styles/DashboardPage.css';
import Lottie from 'lottie-react';
import flowerAnimation from '../assets/flower.json';
import { Link } from 'react-router-dom';
import girls from '../assets/girls.json';

const DashboardPage = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [medicalForm, setMedicalForm] = useState(null);
  const { user, logout } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    } else {
      const fetchMedicalForm = async () => {
        try {
          const token = localStorage.getItem('token');
          const res = await api.get('/api/form/me', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setMedicalForm(res.data);
        } catch (err) {
          console.error('Error fetching medical form:', err.response?.data || err.message);
        }
      };
      fetchMedicalForm();
    }
  }, [user, navigate]);

  const toggleSidebar = () => setShowSidebar(!showSidebar);
  const toggleUserInfo = () => navigate('/profile'); // redirect to full page

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      {/* Flower Animation: Top Right */}
      <div className="flower-top-right">
        <Lottie animationData={flowerAnimation} loop={true} className="flower-animation" />
      </div>

      {/* Left Vertical Quote */}
      <div className="vertical-quote left-vertical-quote">
        <p>"Every cycle tells a story. Listen, learn, and lead your health."</p>
      </div>

      {/* Right Vertical Quote */}
      <div className="vertical-quote right-vertical-quote">
        <p>“Your story is your strength. Let your journey shine.”</p>
      </div>

      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-left" onClick={toggleSidebar}>☰</div>
        <div className="navbar-center">Hello, {user?.name || 'User'} 🌷</div>
        <div className="navbar-right">
          <div className="avatar-icon" onClick={toggleUserInfo}>👤</div>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      {/* Flower Animation: Bottom Left */}
      <div className="flower-bottom-left">
        <Lottie animationData={girls} loop={true} className="flower-animation" />
      </div>

      
 {showSidebar && (
  <div className="sidebar">
    <div className="sidebar-close" onClick={toggleSidebar} role="button" aria-label="Close sidebar">×</div>

    <Link to="/symptoms">PCOS Insights</Link>
    <Link to="/articles">Read Articles</Link>
    <Link to="/know-more">Know More</Link>
    <Link to="/about">About Us</Link>

    
  </div>
)}




      {/* Main Info Section */}
      <div className="info-section">
        <h2>Understanding PCOS</h2>
        <p>
          Polycystic Ovary Syndrome (PCOS) affects 1 in 10 women globally. Early diagnosis,
          lifestyle changes, and medical support are crucial to managing symptoms and improving quality of life.
        </p>
        <p>
          PCOS may be challenging, but with awareness, support, and consistent care, individuals can lead a healthy, fulfilling life.
          Early diagnosis and personalized treatment make a world of difference.
        </p>
        <p>
          This platform aims to empower women with the tools, knowledge, and community support
          to navigate PCOS with strength and clarity.
        </p>
<div className='high'>
        <p>➜ Missing your cycle? Experiencing hormonal imbalance, weight fluctuations, or acne?
If you're unsure whether it could be PCOS, our symptom checker helps you understand your health status.<br></br>
<a href='/symptom-checker' style={{ color: ' #ad1457', fontSize: '16px' }}  > Check your symptoms to know more</a></p></div>

        <div className="pcos-detection-box">
          <h2>Detect PCOS Easily</h2>
          <p>
            To help determine the possibility of PCOS, you can upload your ultrasound scan or fill out a clinical questionnaire.
            Our AI-powered system will guide you through the detection process with ease and confidentiality.
          </p>
          <button className="upload-btn" onClick={() => navigate('/upload')}>
            Upload Data
          </button>
        </div>
      </div>
            {/* Footer */}
      <footer className="dashboard-footer">
        <p>&copy; {new Date().getFullYear()} PCOS Detection Platform. All rights reserved.</p>
      </footer>

    </div>
  );
};

export default DashboardPage;



