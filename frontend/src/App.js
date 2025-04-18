import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';
import MedicalFormPage from './pages/MedicalFormPage';
import DashboardPage from './pages/DashboardPage';
import { UserProvider } from './context/UserContext'; // ✅ Context import
import SymptomsPage from './pages/SymptomsPage';
import UploadDataPage from './pages/UploadDataPage';
import KnowMorePage from './pages/KnowMorePage';
import AboutUsPage from './pages/AboutUspage';
import UserProfilePage from './pages/UserProfilePage';
import Articlespage from './pages/Articlespage';
function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/medical-form" element={<MedicalFormPage />} />
          <Route path="/dashboard" element={<DashboardPage />} /> {/* ✅ Add Dashboard route */}
          <Route path="/symptoms" element={<SymptomsPage />} />
  <Route path="/upload" element={<UploadDataPage />} />
  <Route path="/know-more" element={<KnowMorePage />} />
  <Route path="/about" element={<AboutUsPage />} />
  <Route path="/profile" element={<UserProfilePage />} />
  <Route path="/articles" element={<Articlespage />}/>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
