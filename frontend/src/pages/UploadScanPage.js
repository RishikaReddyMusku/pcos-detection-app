// src/pages/UploadScanPage.js
import React, { useState ,useEffect} from 'react';
import axios from '../api/axios';
import '../styles/UploadScanPage.css';
import '../styles/ClinicalQuestionsPage.css';
import { useNavigate } from 'react-router-dom';



// const UploadScanPage = () => {
//   const [scan, setScan] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [prediction, setPrediction] = useState(null);
//   const [confidence, setConfidence] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setScan(file);
//     if (file) {
//       setPreview(URL.createObjectURL(file));
//       setPrediction(null); // reset on new upload
//       setConfidence(null);
//     }
//   };

//   const handleUpload = async () => {
//     if (!scan) {
//       alert('Please select a scan image to upload.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', scan);
//     const formData1=new FormData();
//     formData1.append('scan',scan);
//     try {
//       await axios.post('/scan/upload', formData1);
//       alert('Scan uploaded successfully!');
//     } catch (err) {
//       alert('Upload failed');
//     }

//     try {
//       setLoading(true);
//       const response = await axios.post('http://localhost:5001/predict', formData);
     

//       // Get prediction from the response
//       const { prediction, confidence } = response.data;

//       setPrediction(prediction === 0 ? 'PCOS Detected' : 'Normal');
//       setConfidence((confidence * 100).toFixed(2)); // Convert to %
//     } catch (err) {
//       console.error('Upload failed:', err);
//       alert('Upload failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="upload-scan-container">
//       <h2>📤 Upload Your Ultrasound Scan</h2>

//       <div className="upload-section">
//         <label htmlFor="scanInput" className="file-label">
//           {/* {scan ? scan.name : 'Choose a file'} */}
//           Choose a file
//         </label>
//         <input
//           id="scanInput"
//           type="file"
//           accept="image/*"
//           onChange={handleFileChange}
//         />

//         {preview && (
//           <div className="preview-box">
//             <img src={preview} alt="Preview" />
//           </div>
//         )}

//         <button onClick={handleUpload} disabled={loading}>
//           {loading ? 'Uploading & Predicting...' : 'Upload & Predict'}
//         </button>

//         {/* Display result */}
//         {prediction && (
//           <div className="result-box">
//             <h3>🔍 Result:</h3>
//             <p><strong>Prediction:</strong> {prediction}</p>
//             <p><strong>Confidence:</strong> {confidence}%</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UploadScanPage;





const ClinicalQuestionsPage = () => {
  const [scan, setScan] = useState(null);
  const [preview, setPreview] = useState(null);
  const [prediction, setPrediction] = useState(null);
  //const [confidence, setConfidence] = useState(null);
  const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
  

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setScan(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
      setPrediction(null); // reset on new upload
      //setConfidence(null);
    }
  };
  const handleresult = () => {
    navigate('/final-result');
  };

  const handleUpload = async () => {
    if (!scan) {
      alert('Please select a scan image to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', scan);
    const formData1=new FormData();
    formData1.append('scan',scan);
  
    
    try {
      await axios.post('/scan/upload', formData1);
      alert('Scan uploaded successfully!');
    } catch (err) {
      alert('Upload failed');
    }

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5001/predict', formData);
     

      // Get prediction from the response
      const { prediction } = response.data;

      setPrediction(prediction === 0 ? 'PCOS Detected' : 'Normal');
      localStorage.setItem('scanResult',prediction);
      //setConfidence((confidence * 100).toFixed(2)); // Convert to %
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Upload failed');
    } finally {
      setLoading(false);
    }
    
    
  };

  // return (

  // );
  const [prediction1, setPrediction1] = useState(null);

  const [medicalData, setMedicalData] = useState({
    age: '', height: '', weight: '', bloodGroup: ''
  });

  const [formData, setFormData] = useState({
    hb: '', betaHCG1: '', betaHCG2: '', fsh: '', lh: '', fshLhRatio: '', tsh: '', amh: '',
    prl: '', vitD3: '', prg: '', rbs: '', cycle: '', cycleLength: '', pregnant: '',
    abortions: '', follicleL: '', follicleR: '', avgFL: '', avgFR: '', endometrium: '',
    bmi: '', hip: '', waist: '', waistHipRatio: '', bpSys: '', bpDia: '',
    marriageYears: '', weightGain: '', hairGrowth: '', skinDarkening: '', hairLoss: '',
    pimples: '', fastFood: '', regularExercise: ''
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('medicalProfile'));
    if (saved) setMedicalData(saved);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const payload = { ...medicalData, ...formData };
    const payload = {
      medicalProfile: {
        age: medicalData.age,
        weight: medicalData.weight,
        height: medicalData.height,
        bloodGroup: medicalData.bloodGroup
      },
      bloodTest: {
        hb: formData.hb,
        betaHCG1: formData.betaHCG1,
        betaHCG2: formData.betaHCG2,
        fsh: formData.fsh,
        lh: formData.lh,
        fshLhRatio: (formData.fsh/formData.lh).toFixed(2),
        tsh: formData.tsh,
        amh: formData.amh,
        prl: formData.prl,
        vitD3: formData.vitD3,
        prg: formData.prg,
        rbs: formData.rbs
      },
      reproductiveHealth: {
        cycle: formData.cycle,
        cycleLength: formData.cycleLength,
        marriageYears: formData.marriageYears,
        pregnant: formData.pregnant,
        abortions: formData.abortions
      },
      bodyMetrics: {
        bmi: (medicalData.weight/((medicalData.height/100) * (medicalData.height/100))).toFixed(2),
        hip: formData.hip,
        waist: formData.waist,
        waistHipRatio: (formData.hip/formData.waist).toFixed(2),
        bpSys: formData.bpSys,
        bpDia: formData.bpDia,
        follicleL: formData.follicleL,
        follicleR: formData.follicleR,
        avgFL: formData.avgFL,
        avgFR: formData.avgFR,
        endometrium: formData.endometrium
      },
      lifestyleAndSymptoms: {
        weightGain: formData.weightGain,
        hairGrowth: formData.hairGrowth,
        hairLoss: formData.hairLoss,
        pimples: formData.pimples,
        fastFood: formData.fastFood,
        regularExercise: formData.regularExercise,
        skinDarkening: formData.skinDarkening
      }
    };
    
    
    console.log("Payload being sent to backend:", payload); 

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://127.0.0.1:5000/clinical/submit', payload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
      
      });
      
   

   
      alert('Data submitted successfully!');
      setPrediction1(response.data.pcos_prediction);
      console.log(prediction1);
      console.log(prediction);
      if (response.data.pcos_prediction === 1) {
        console.log("Clinical Result: PCOS Detected");
        localStorage.setItem("clinicalResult", "1");
      } else {
        console.log("Clinical Result: Not Detected");
        localStorage.setItem("clinicalResult", "0");
      }
      
  
      console.log("Full API response:", response.data);

      console.log("Raw response from API:", response.data.pcos_prediction);

      navigate('/final-result');
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Please try again.');
    }
  };

  const handleSampleTest = () => {
    setMedicalData({
      age: '25',
      weight: '74',
      height: '152',
      bloodGroup: ''
    });
  
    setFormData({
      hb: '11.7', betaHCG1: '1', betaHCG2: '1214.23', fsh: '2', lh: '1.51', fshLhRatio: '', tsh: '6.51', amh: '7.94',
      prl: '22.43', vitD3: '31.4', prg: '0.3', rbs: '125', cycle: 'R', cycleLength: '4', pregnant: 'Y',
      abortions: '1', follicleL: '15', follicleR: '8', avgFL: '20', avgFR: '21', endometrium: '8',
      bmi: '', hip: '45', waist: '40', waistHipRatio: '', bpSys: '120', bpDia: '80',
      marriageYears: '2', weightGain: 'Y', hairGrowth: 'Y', skinDarkening: 'Y', hairLoss: 'Y',
      pimples: 'Y', fastFood: 'Y', regularExercise: 'Y'
    });
  };
  

  const handleClear = () => {
    setFormData({
      hb: '', betaHCG1: '', betaHCG2: '', fsh: '', lh: '', fshLhRatio: '', tsh: '', amh: '',
      prl: '', vitD3: '', prg: '', rbs: '', cycle: '', cycleLength: '', pregnant: '',
      abortions: '', follicleL: '', follicleR: '', avgFL: '', avgFR: '', endometrium: '',
      bmi: '', hip: '', waist: '', waistHipRatio: '', bpSys: '', bpDia: '',
      marriageYears: '', weightGain: '', hairGrowth: '', skinDarkening: '', hairLoss: '',
      pimples: '', fastFood: '', regularExercise: ''
    });
  };

  return (
    <div className="clinical-form-wrapper">

    
    <div className="upload-scan-container">
    <h2>📤 Upload Your Ultrasound Scan</h2>

    <div className="upload-section">
      <label htmlFor="scanInput" className="file-label">
        {/* {scan ? scan.name : 'Choose a file'} */}
        Choose a file
      </label>
      <input
        id="scanInput"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />

      {preview && (
        <div className="preview-box">
          <img src={preview} alt="Preview" />
        </div>
      )}

      <button onClick={handleUpload} disabled={loading}>
        {loading ? 'Uploading...' : 'Upload '}
      </button>

      {/* Display result */}
      {prediction && (
        <div className="result-box">
          
          <p><strong>Thank you for uploading your scan. Please fill the Clinical and Biomedical fields below.</strong></p>
          
        </div>
      )}
    </div>
  </div>

    <div className="">
      <h2>🧬 Enter Clinical Information for PCOS Detection</h2>
      <form onSubmit={handleSubmit} className="clinical-form">

        <fieldset>
          <legend>🩸 Blood Test Information</legend>
          <div className="form-grid">
            {[['hb', 'Hb (g/dl)'], ['betaHCG1', 'I beta-HCG'], ['betaHCG2', 'II beta-HCG'], ['fsh', 'FSH'], ['lh', 'LH'], ['fshLhRatio', 'FSH/LH Ratio'], ['tsh', 'TSH'], ['amh', 'AMH'], ['prl', 'PRL'], ['vitD3', 'Vitamin D3'], ['prg', 'PRG'], ['rbs', 'RBS']].map(([name, label]) => (
              <label key={name}>
                {label}
                <input name={name} value={formData[name]} onChange={handleChange} />
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>👩‍⚕️ Reproductive Health</legend>
          <div className="form-grid">
            {[['cycle', 'Cycle (R/I)'], ['cycleLength', 'Cycle Length (days)'], ['pregnant', 'Pregnant (Y/N)'], ['abortions', 'No. of Abortions'], ['follicleL', 'Follicle No. (L)'], ['follicleR', 'Follicle No. (R)'], ['avgFL', 'Avg F size (L)'], ['avgFR', 'Avg F size (R)'], ['endometrium', 'Endometrium (mm)']].map(([name, label]) => (
              <label key={name}>
                {label}
                <input name={name} value={formData[name]} onChange={handleChange} />
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>📏 Body Metrics</legend>
          <div className="form-grid">
            {[['bmi', 'BMI'], ['hip', 'Hip (inch)'], ['waist', 'Waist (inch)'], ['waistHipRatio', 'Waist:Hip Ratio'], ['bpSys', 'BP Systolic'], ['bpDia', 'BP Diastolic']].map(([name, label]) => (
              <label key={name}>
                {label}
                <input name={name} value={formData[name]} onChange={handleChange} />
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>🧘 Lifestyle & Symptoms</legend>
          <div className="form-grid">
            <label>
              Marriage Status (Yrs)
              <input name="marriageYears" value={formData.marriageYears} onChange={handleChange} />
            </label>

            {[['weightGain', 'Weight gain'], ['hairGrowth', 'Hair growth'], ['skinDarkening', 'Skin darkening'], ['hairLoss', 'Hair loss'], ['pimples', 'Pimples'], ['fastFood', 'Fast food'], ['regularExercise', 'Reg. Exercise']].map(([name, label]) => (
              <label key={name}>
                {label} (Y/N)
                <select name={name} value={formData[name]} onChange={handleChange}>
                  <option value="" disabled>Select</option>
                  <option value="Y">Yes</option>
                  <option value="N">No</option>
                </select>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="button-group">
  <button type="submit"  className="submit-btn" >Submit </button>
  <button type="button" className="submit-btn" onClick={handleClear}> Clear</button>
  <button type="button" className="hidden-sample-btn" onClick={handleSampleTest}> Sample Test</button>
</div>



      </form>
     

  





    </div>
    </div>
  );
};

export default ClinicalQuestionsPage;