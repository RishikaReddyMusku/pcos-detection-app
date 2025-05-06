// src/pages/LandingPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LandingPage.css';
import Lottie from 'lottie-react';
import womenAnimation from '../assets/women.json';
import wellnessAnimation from '../assets/wellness.json';
import api from '../api/axios';
import { useUser } from '../context/UserContext';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/api/auth/login', { email, password });
      login(res.data.user);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="landing-container">
      {/* Left Panel */}
      <div className="left-panel">
        <h1>PCOS DETECTION</h1>

        <ul className="description-list">
          <li>Empowering women with accessible, early diagnosis.</li>
          <li>Supporting hormonal balance and long-term wellness.</li>
          <li>Prioritizing every woman’s journey with care and clarity.</li>
        </ul>

        <div className="animations-row">
          <Lottie animationData={womenAnimation} className="lottie large" loop={true} />
          <Lottie animationData={wellnessAnimation} className="lottie large" loop={true} />
        </div>
      </div>

      {/* Right Panel */}
      <div className="right-panel">
        <form className="form-box" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign In</button>
          <p className="link">
  Don’t have an account? <Link to="/register" className="pink-link">Sign up</Link>
</p>

        </form>
      </div>
    </div>
  );
};

export default LandingPage;