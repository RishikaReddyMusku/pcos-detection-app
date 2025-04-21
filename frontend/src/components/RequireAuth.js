import React from 'react';
import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // If no token, redirect to login page (LandingPage)
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RequireAuth;
