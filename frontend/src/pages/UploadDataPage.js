// // src/pages/UploadDataPage.js
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../styles/UploadDataPage.css';
// import heartbg from '../assets/heartsteth.jpg';

// // Importing icons
// import { FaLock, FaCogs, FaXRay, FaClipboardList } from 'react-icons/fa';

// const UploadDataPage = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="upload-wrapper" style={{ backgroundImage: `url(${heartbg})` }}>
//       <div className="wholematter">

//         <div className="upload-intro">
//           <h1>Help Us Detect PCOS</h1>
//           <p>
//             To provide a precise diagnosis, we need medical data. Rest assured, your information remains confidential and is only used for PCOS detection purposes.
//           </p>
//           <ul>
//             <li><FaLock className="icon black-icon" /> All uploads are secure and private.</li>
//             <li><FaCogs className="icon black-icon" /> Your medical data helps us ensure accurate detection and personalized insights</li>
//           </ul>
//         </div>

//         <div className="upload-options">
//           <div className="option-card" onClick={() => navigate('/upload-scan')}>
//             <h3>
//               <FaXRay className="icon blue-icon" /> Upload Your Data
//             </h3>
//             <p>Use AI to detect PCOS by uploading your ovarian ultrasound image ,Biomedical test Results and Clinical Questionnaire.</p>
//           </div>

          
//         </div>

//       </div>
//     </div>
//   );
// };

// export default UploadDataPage

import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/UploadDataPage.css';
import heartbg from '../assets/heartsteth.jpg';
import { FaLock, FaCogs, FaXRay } from 'react-icons/fa';

const UploadDataPage = () => {
  const navigate = useNavigate();

  return (
    <div className="upload-wrapper" style={{ backgroundImage: `url(${heartbg})` }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10 col-12 wholematter">
            <div className="upload-intro">
              <h1>Help Us Detect PCOS</h1>
              <p>
                To provide a precise diagnosis, we need medical data. Rest assured, your information remains confidential and is only used for PCOS detection purposes.
              </p>
              <ul>
                <li><FaLock className="icon black-icon" /> All uploads are secure and private.</li>
                <li><FaCogs className="icon black-icon" /> Your medical data helps us ensure accurate detection and personalized insights</li>
              </ul>
            </div>

            <div className="upload-options">
              <div className="option-card" onClick={() => navigate('/upload-scan')}>
                <h3><FaXRay className="icon blue-icon" /> Upload Your Data</h3>
                <p>Use AI to detect PCOS by uploading your ovarian ultrasound image, biomedical test results, and clinical questionnaire.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadDataPage;
