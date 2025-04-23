// src/pages/RegisterPage.js
import React, { useState } from 'react';
import '../styles/RegisterPage.css';

import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import api from '../api/axios';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { login } = useUser();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/api/auth/register', formData);
      login(res.data.user);
      localStorage.setItem('token', res.data.token);
      navigate('/medical-form');
    } catch (err) {
      alert(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="register-page">
    <div className="register-container">
      <form className="register-box" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Create Account</button>

        <p className="link">
          Already have an account? <Link to="/">Sign in</Link>
        </p>
      </form>
    </div>
    </div>
  );
};

export default RegisterPage;
