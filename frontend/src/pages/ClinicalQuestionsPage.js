// import React, { useState, useEffect } from 'react';
// import axios from '../api/axios';
// import '../styles/ClinicalQuestionsPage.css';

// const ClinicalQuestionsPage = () => {
//   const [prediction, setPrediction] = useState(null);
  
//   const [medicalData, setMedicalData] = useState({
//     age: '', height: '', weight: '', bloodGroup: ''
//   });

//   const [formData, setFormData] = useState({
//     hb: '', betaHCG1: '', betaHCG2: '', fsh: '', lh: '', fshLhRatio: '', tsh: '', amh: '',
//     prl: '', vitD3: '', prg: '', rbs: '', cycle: '', cycleLength: '', pregnant: '',
//     abortions: '', follicleL: '', follicleR: '', avgFL: '', avgFR: '', endometrium: '',
//     bmi: '', hip: '', waist: '', waistHipRatio: '', bpSys: '', bpDia: '',
//     marriageYears: '', weightGain: '', hairGrowth: '', skinDarkening: '', hairLoss: '',
//     pimples: '', fastFood: '', regularExercise: ''
//   });

//   useEffect(() => {
//     const saved = JSON.parse(localStorage.getItem('medicalProfile'));
//     if (saved) setMedicalData(saved);
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const payload = {
//       ...medicalData,
//       ...formData
//     };

//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.post('/clinical/submit', payload, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
  
//       console.log(response.data);  // Log the response to ensure prediction is included
  
//       alert('Data submitted successfully!');
//       setPrediction(response.data.pcos_prediction);  // Set prediction value here
//     } catch (err) {
//       console.error(err);
//       alert('Something went wrong. Please try again.');
//     }
  
//   };

//   const handleClear = () => {
//     setFormData({
//       hb: '', betaHCG1: '', betaHCG2: '', fsh: '', lh: '', fshLhRatio: '', tsh: '', amh: '',
//       prl: '', vitD3: '', prg: '', rbs: '', cycle: '', cycleLength: '', pregnant: '',
//       abortions: '', follicleL: '', follicleR: '', avgFL: '', avgFR: '', endometrium: '',
//       bmi: '', hip: '', waist: '', waistHipRatio: '', bpSys: '', bpDia: '',
//       marriageYears: '', weightGain: '', hairGrowth: '', skinDarkening: '', hairLoss: '',
//       pimples: '', fastFood: '', regularExercise: ''
//     });
//   };
  

//   return (
//     <div className="clinical-form-wrapper">
//       <h2>🧬 Enter Clinical Information for PCOS Detection</h2>
//       <form onSubmit={handleSubmit} className="clinical-form">

//         <fieldset>
//           <legend>🩸 Blood Test Information</legend>
//           <div className="form-grid">
//             {[
//               ['hb', 'Hb (g/dl)'], ['betaHCG1', 'I beta-HCG'], ['betaHCG2', 'II beta-HCG'],
//               ['fsh', 'FSH'], ['lh', 'LH'], ['fshLhRatio', 'FSH/LH Ratio'], ['tsh', 'TSH'],
//               ['amh', 'AMH'], ['prl', 'PRL'], ['vitD3', 'Vitamin D3'], ['prg', 'PRG'], ['rbs', 'RBS']
//             ].map(([name, label]) => (
//               <label key={name}>
//                 {label}
//                 <input name={name} onChange={handleChange} />
//               </label>
//             ))}
//           </div>
//         </fieldset>

//         <fieldset>
//           <legend>👩‍⚕️ Reproductive Health</legend>
//           <div className="form-grid">
//             {[
//               ['cycle', 'Cycle (R/I)'], ['cycleLength', 'Cycle Length (days)'],
//               ['pregnant', 'Pregnant (Y/N)'], ['abortions', 'No. of Abortions'],
//               ['follicleL', 'Follicle No. (L)'], ['follicleR', 'Follicle No. (R)'],
//               ['avgFL', 'Avg F size (L)'], ['avgFR', 'Avg F size (R)'], ['endometrium', 'Endometrium (mm)']
//             ].map(([name, label]) => (
//               <label key={name}>
//                 {label}
//                 <input name={name} onChange={handleChange} />
//               </label>
//             ))}
//           </div>
//         </fieldset>

//         <fieldset>
//           <legend>📏 Body Metrics</legend>
//           <div className="form-grid">
//             {[
//               ['bmi', 'BMI'], ['hip', 'Hip (inch)'], ['waist', 'Waist (inch)'],
//               ['waistHipRatio', 'Waist:Hip Ratio'], ['bpSys', 'BP Systolic'], ['bpDia', 'BP Diastolic']
//             ].map(([name, label]) => (
//               <label key={name}>
//                 {label}
//                 <input name={name} onChange={handleChange} />
//               </label>
//             ))}
//           </div>
//         </fieldset>

//         <fieldset>
//           <legend>👩‍⚕️ Lifestyle & Symptoms</legend>
//           <div className="form-grid">
//             <label>
//               Marriage Status (Yrs)
//               <input name="marriageYears" onChange={handleChange} />
//             </label>

//             {[
//               ['weightGain', 'Weight gain'],
//               ['hairGrowth', 'Hair growth'],
//               ['skinDarkening', 'Skin darkening'],
//               ['hairLoss', 'Hair loss'],
//               ['pimples', 'Pimples'],
//               ['fastFood', 'Fast food'],
//               ['regularExercise', 'Reg. Exercise']
//             ].map(([name, label]) => (
//               <label key={name}>
//                 {label} (Y/N)
//                 <select name={name} onChange={handleChange} defaultValue="">
//                   <option value="" disabled>Select</option>
//                   <option value="Y">Yes</option>
//                   <option value="N">No</option>
//                 </select>
//               </label>
//             ))}
//           </div>
//         </fieldset>

//         <div className="button-group">
//   <button type="submit" className="submit-btn">🚀 Submit Clinical Data</button>
//   <button type="button" className="submit-btn" onClick={handleClear}>🧹 Clear</button>
// </div>

//       </form>
//       {prediction !== null && (
//         <div className={`prediction-container ${prediction === 1 ? 'pcos-yes' : 'pcos-no'}`}>
//         <h2 className="prediction-title">Prediction Result</h2>
//         <p className="prediction-message">
//           {prediction === 1 
//             ? '⚠️ PCOS Detected. Please consult a gynecologist and monitor your health regularly.'
//             : '✅ No signs of PCOS detected. Keep up your healthy lifestyle and regular check-ups!'}
//         </p>
//       </div>
      
//       )}
//     </div>
//   );
// };

// export default ClinicalQuestionsPage;



import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import '../styles/ClinicalQuestionsPage.css';

const ClinicalQuestionsPage = () => {
  const [prediction, setPrediction] = useState(null);

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
        fshLhRatio: formData.fshLhRatio,
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
        bmi: formData.bmi,
        hip: formData.hip,
        waist: formData.waist,
        waistHipRatio: formData.waistHipRatio,
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
      setPrediction(response.data.pcos_prediction);
      console.log("Full API response:", response.data);

      console.log("Raw response from API:", response.data.pcos_prediction);

      
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
          <legend>👩‍⚕️ Lifestyle & Symptoms</legend>
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
    <button type="submit" className="submit-btn">🚀 Submit Clinical Data</button>
    <button type="button" className="submit-btn" onClick={handleClear}>🧹 Clear</button>
    <button type="button" className="submit-btn" onClick={handleSampleTest}>🧪 Sample Test</button>
</div>

      </form>

      {prediction !== null && (
        <div className={`prediction-container ${prediction === 1 ? 'pcos-yes' : 'pcos-no'}`}>
          <h2 className="prediction-title">Prediction Result</h2>
          <p className="prediction-message">
            {prediction === 1
              ? '⚠️ PCOS Detected. Please consult a gynecologist and monitor your health regularly.'
              : '✅ No signs of PCOS detected. Keep up your healthy lifestyle and regular check-ups!'}
          </p>
        </div>
      )}
    </div>
  );
};

export default ClinicalQuestionsPage;
