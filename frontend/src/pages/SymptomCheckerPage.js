// import React, { useState } from 'react';
// import '../styles/SymptomCheckerPage.css'; // keep using your CSS file

// const SymptomCheckerPage = () => {
//   const [formData, setFormData] = useState({
//     cycle: '',
//     weightGain: '',
//     hairGrowth: '',
//     skinDarkening: '',
//     hairLoss: '',
//     pimples: '',
//     fastFood: '',
//     exercise: ''
//   });

//   const [recommendations, setRecommendations] = useState(null);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const recommendTestsFromSymptoms = (userData) => {
//     const rec = {
//       Suggested_Tests: [],
//       Lifestyle_Recommendations: []
//     };

//     const hormonalIndicators = [
//       userData.hairGrowth === 'Y',
//       userData.skinDarkening === 'Y',
//       userData.hairLoss === 'Y',
//       userData.pimples === 'Y'
//     ];
//     const hormonalScore = hormonalIndicators.filter(val => val).length;

//     if (userData.cycle === 'I' && hormonalScore >= 2) {
//       rec.Suggested_Tests.push({
//         icon: "🧬",
//         name: "Hormonal Panel",
//         tests_included: ["LH", "FSH", "Testosterone", "Estrogen", "Prolactin"],
//         description: "Checks for hormonal imbalances that may cause PCOS symptoms like irregular periods, acne, or hair growth."
//       });
//     }

//     const thyroidScore = (userData.cycle === 'I' ? 1 : 0) +
//                          (userData.weightGain === 'Y' ? 1 : 0) +
//                          (userData.hairLoss === 'Y' ? 1 : 0);
//     if (thyroidScore >= 2) {
//       rec.Suggested_Tests.push({
//         icon: "🦋",
//         name: "Thyroid Profile",
//         tests_included: ["TSH", "T3", "T4"],
//         description: "Rules out thyroid dysfunction, which shows symptoms like hair fall, weight gain, and cycle changes."
//       });
//     }

//     const metabolicScore = (userData.weightGain === 'Y' ? 1 : 0) +
//                            (userData.skinDarkening === 'Y' ? 1 : 0) +
//                            (userData.fastFood === 'Y' ? 1 : 0);
//     if (metabolicScore >= 2) {
//       rec.Suggested_Tests.push({
//         icon: "🍩",
//         name: "Insulin & Glucose Tolerance Test",
//         tests_included: ["Fasting Glucose", "Fasting Insulin", "OGTT"],
//         description: "Detects insulin resistance, which is common in PCOS and affects weight, skin, and ovulation."
//       });
//     }

//     // Lifestyle recommendations
//     if (userData.fastFood === 'Y') {
//       rec.Lifestyle_Recommendations.push("🍔 Reduce fast food intake to control insulin levels and maintain hormonal balance.");
//     }

//     if (userData.exercise === 'N') {
//       rec.Lifestyle_Recommendations.push("🏃‍♀️ Start regular physical activity to manage PCOS symptoms and improve metabolism.");
//     }

//     if (userData.weightGain === 'Y') {
//       rec.Lifestyle_Recommendations.push("🥗 Consult a dietitian for a PCOS-friendly plan to manage weight and hormonal health.");
//     }

//     return rec;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const result = recommendTestsFromSymptoms(formData);
  
//     // ✅ Check if any value is 'Y' or cycle is 'I'
//     const concerningValues = Object.values(formData).some(val => val === 'Y' || val === 'I');
  
//     if (concerningValues) {
//       result.Suggested_Tests.push({
//         icon: "🖥️",
//         name: "Ultrasound Ovarian Scan",
//         tests_included: ["Pelvic Ultrasound"],
//         description: "Checks for the presence of cysts or enlarged ovaries — a key diagnostic step in PCOS."
//       });
//     }
  
//     setRecommendations(result);
//   };
  
//   const handleClear = () => {
//     setFormData({
//       cycle: '',
//       weightGain: '',
//       hairGrowth: '',
//       skinDarkening: '',
//       hairLoss: '',
//       pimples: '',
//       fastFood: '',
//       exercise: ''
//     });
//     setRecommendations(null); // Reset recommendations as well
//   };
  
//   return (
//     <div className="symptom-checker-container">
//       <h2>🩺 PCOS Symptom Checker</h2>
//       <form className="symptom-form" onSubmit={handleSubmit}>
//         <label>
//           Menstrual Cycle
//           <select name="cycle" value={formData.cycle} onChange={handleChange} required>
//             <option value="">--Select--</option>
//             <option value="R">Regular</option>
//             <option value="I">Irregular</option>
//           </select>
//         </label>

//         {["weightGain", "hairGrowth", "skinDarkening", "hairLoss", "pimples", "fastFood", "exercise"].map(field => (
//           <label key={field}>
//             {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')} (Y/N)
//             <select name={field} value={formData[field]} onChange={handleChange} required>
//               <option value="">--Select--</option>
//               <option value="Y">Yes</option>
//               <option value="N">No</option>
//             </select>
//           </label>
//         ))}

//       <div className="button-container">
//         <button type="submit">Submit</button>
//         <button type="button" onClick={handleClear} className="clear-btn">Clear</button>
//       </div>

//       </form>

//       {recommendations && (
//         <div className="recommendations">
//           <h3>🔍 Test Recommendations</h3>
//           {recommendations.Suggested_Tests.length > 0 ? (
//             <div className="test-cards">
//               {recommendations.Suggested_Tests.map((test, idx) => (
//                 <div className="test-card" key={idx}>
//                   <h4>{test.icon} {test.name}</h4>
//                   <p>{test.description}</p>
//                   <strong>Includes:</strong> <em>{test.tests_included.join(', ')}</em>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p>✅ No specific tests recommended based on current symptoms.</p>
//           )}

//           {recommendations.Lifestyle_Recommendations.length > 0 && (
//             <>
//             <h3>🌱 Lifestyle Tips</h3>
//             <div className="lifestyle-tips">
            
//               <ul>
//                 {recommendations.Lifestyle_Recommendations.map((tip, idx) => (
//                   <li key={idx}>{tip}</li>
//                 ))}
//               </ul>
           
//               </div>
//             </>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SymptomCheckerPage;

// import React, { useState } from 'react';
// import '../styles/SymptomCheckerPage.css'; // Keep using your existing CSS file

// const SymptomCheckerPage = () => {
//   const [formData, setFormData] = useState({
//     cycle: '',
//     weightGain: '',
//     hairGrowth: '',
//     skinDarkening: '',
//     hairLoss: '',
//     pimples: '',
//     fastFood: '',
//     exercise: ''
//   });

//   const [recommendations, setRecommendations] = useState(null);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const recommendTestsFromSymptoms = (userData) => {
//     const rec = {
//       Suggested_Tests: [],
//       Lifestyle_Recommendations: []
//     };

//     const hormonalIndicators = [
//       userData.hairGrowth === 'Y',
//       userData.skinDarkening === 'Y',
//       userData.hairLoss === 'Y',
//       userData.pimples === 'Y'
//     ];
//     const hormonalScore = hormonalIndicators.filter(val => val).length;

//     if (userData.cycle === 'I' && hormonalScore >= 2) {
//       rec.Suggested_Tests.push({
//         icon: "🧬",
//         name: "Hormonal Panel",
//         tests_included: ["LH", "FSH", "Testosterone", "Estrogen", "Prolactin"],
//         description: "Checks for hormonal imbalances that may cause PCOS symptoms like irregular periods, acne, or hair growth."
//       });
//     }

//     const thyroidScore = (userData.cycle === 'I' ? 1 : 0) +
//                          (userData.weightGain === 'Y' ? 1 : 0) +
//                          (userData.hairLoss === 'Y' ? 1 : 0);
//     if (thyroidScore >= 2) {
//       rec.Suggested_Tests.push({
//         icon: "🦋",
//         name: "Thyroid Profile",
//         tests_included: ["TSH", "T3", "T4"],
//         description: "Rules out thyroid dysfunction, which shows symptoms like hair fall, weight gain, and cycle changes."
//       });
//     }

//     const metabolicScore = (userData.weightGain === 'Y' ? 1 : 0) +
//                            (userData.skinDarkening === 'Y' ? 1 : 0) +
//                            (userData.fastFood === 'Y' ? 1 : 0);
//     if (metabolicScore >= 2) {
//       rec.Suggested_Tests.push({
//         icon: "🍩",
//         name: "Insulin & Glucose Tolerance Test",
//         tests_included: ["Fasting Glucose", "Fasting Insulin", "OGTT"],
//         description: "Detects insulin resistance, which is common in PCOS and affects weight, skin, and ovulation."
//       });
//     }

//     // Lifestyle recommendations
//     if (userData.fastFood === 'Y') {
//       rec.Lifestyle_Recommendations.push("🍔 Reduce fast food intake to control insulin levels and maintain hormonal balance.");
//     }

//     if (userData.exercise === 'N') {
//       rec.Lifestyle_Recommendations.push("🏃‍♀️ Start regular physical activity to manage PCOS symptoms and improve metabolism.");
//     }

//     if (userData.weightGain === 'Y') {
//       rec.Lifestyle_Recommendations.push("🥗 Consult a dietitian for a PCOS-friendly plan to manage weight and hormonal health.");
//     }

//     return rec;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const result = recommendTestsFromSymptoms(formData);
  
//     // ✅ Check if any value is 'Y' or cycle is 'I'
//     const concerningValues = Object.values(formData).some(val => val === 'Y' || val === 'I');
  
//     if (concerningValues) {
//       result.Suggested_Tests.push({
//         icon: "🖥️",
//         name: "Ultrasound Ovarian Scan",
//         tests_included: ["Pelvic Ultrasound"],
//         description: "Checks for the presence of cysts or enlarged ovaries — a key diagnostic step in PCOS."
//       });
//     }
  
//     setRecommendations(result);
//   };
  
//   const handleClear = () => {
//     setFormData({
//       cycle: '',
//       weightGain: '',
//       hairGrowth: '',
//       skinDarkening: '',
//       hairLoss: '',
//       pimples: '',
//       fastFood: '',
//       exercise: ''
//     });
//     setRecommendations(null); // Reset recommendations as well
//   };

//   return (
//     <div className="container symptom-checker-container">
//       <h2 className="text-center my-4">🩺 PCOS Symptom Checker</h2>
//       <form className="symptom-form" onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label className="form-label">Menstrual Cycle</label>
//           <select name="cycle" value={formData.cycle} onChange={handleChange} className="form-select" required>
//             <option value="">--Select--</option>
//             <option value="R">Regular</option>
//             <option value="I">Irregular</option>
//           </select>
//         </div>

//         {["weightGain", "hairGrowth", "skinDarkening", "hairLoss", "pimples", "fastFood", "exercise"].map(field => (
//           <div className="mb-3" key={field}>
//             <label className="form-label">
//               {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')} (Y/N)
//             </label>
//             <select name={field} value={formData[field]} onChange={handleChange} className="form-select" required>
//               <option value="">--Select--</option>
//               <option value="Y">Yes</option>
//               <option value="N">No</option>
//             </select>
//           </div>
//         ))}

//         <div className="d-flex justify-content-between">
//           <button type="submit" className="btn btn-primary">Submit</button>
//           <button type="button" onClick={handleClear} className="btn btn-secondary">Clear</button>
//         </div>
//       </form>

//       {recommendations && (
//         <div className="recommendations mt-4">
//           <h3>🔍 Test Recommendations</h3>
//           {recommendations.Suggested_Tests.length > 0 ? (
//             <div className="row">
//               {recommendations.Suggested_Tests.map((test, idx) => (
//                 <div className="col-12 col-md-4 mb-3" key={idx}>
//                   <div className="card p-3">
//                     <h4>{test.icon} {test.name}</h4>
//                     <p>{test.description}</p>
//                     <strong>Includes:</strong> <em>{test.tests_included.join(', ')}</em>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p>✅ No specific tests recommended based on current symptoms.</p>
//           )}

//           {recommendations.Lifestyle_Recommendations.length > 0 && (
//             <>
//               <h3>🌱 Lifestyle Tips</h3>
//               <ul>
//                 {recommendations.Lifestyle_Recommendations.map((tip, idx) => (
//                   <li key={idx}>{tip}</li>
//                 ))}
//               </ul>
//             </>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SymptomCheckerPage;





import React, { useState } from 'react';
import '../styles/SymptomCheckerPage.css'; // Keep using your existing CSS file

const SymptomCheckerPage = () => {
  const [formData, setFormData] = useState({
    cycle: '',
    weightGain: '',
    hairGrowth: '',
    skinDarkening: '',
    hairLoss: '',
    pimples: '',
    fastFood: '',
    exercise: ''
  });

  const [recommendations, setRecommendations] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const recommendTestsFromSymptoms = (userData) => {
    const rec = {
      Suggested_Tests: [],
      Lifestyle_Recommendations: []
    };

    const hormonalIndicators = [
      userData.hairGrowth === 'Y',
      userData.skinDarkening === 'Y',
      userData.hairLoss === 'Y',
      userData.pimples === 'Y'
    ];
    const hormonalScore = hormonalIndicators.filter(val => val).length;

    if (userData.cycle === 'I' && hormonalScore >= 2) {
      rec.Suggested_Tests.push({
        icon: "🧬",
        name: "Hormonal Panel",
        tests_included: ["LH", "FSH", "Testosterone", "Estrogen", "Prolactin"],
        description: "Checks for hormonal imbalances that may cause PCOS symptoms like irregular periods, acne, or hair growth."
      });
    }
    if(userData.cycle==='I'){
      rec.Suggested_Tests.push({
        icon: "🖥️",
        name: "Ultrasound Ovarian Scan",
        tests_included: ["Pelvic Ultrasound"],
        description: "Checks for the presence of cysts or enlarged ovaries — a key diagnostic step in PCOS."
      });

    }

    const thyroidScore = (userData.cycle === 'I' ? 1 : 0) +
                         (userData.weightGain === 'Y' ? 1 : 0) +
                         (userData.hairLoss === 'Y' ? 1 : 0);
    if (thyroidScore >= 2) {
      rec.Suggested_Tests.push({
        icon: "🦋",
        name: "Thyroid Profile",
        tests_included: ["TSH", "T3", "T4"],
        description: "Rules out thyroid dysfunction, which shows symptoms like hair fall, weight gain, and cycle changes."
      });
    }

    const metabolicScore = (userData.weightGain === 'Y' ? 1 : 0) +
                           (userData.skinDarkening === 'Y' ? 1 : 0) +
                           (userData.fastFood === 'Y' ? 1 : 0);
    if (metabolicScore >= 2) {
      rec.Suggested_Tests.push({
        icon: "🍩",
        name: "Insulin & Glucose Tolerance Test",
        tests_included: ["Fasting Glucose", "Fasting Insulin", "OGTT"],
        description: "Detects insulin resistance, which is common in PCOS and affects weight, skin, and ovulation."
      });
      
    }

    // Lifestyle recommendations
    if (userData.fastFood === 'Y') {
      rec.Lifestyle_Recommendations.push("🍔 Reduce fast food intake to control insulin levels and maintain hormonal balance.");
    }

    if (userData.exercise === 'N') {
      rec.Lifestyle_Recommendations.push("🏃‍♀️ Start regular physical activity to manage PCOS symptoms and improve metabolism.");
    }

    if (userData.weightGain === 'Y') {
      rec.Lifestyle_Recommendations.push("🥗 Consult a dietitian for a PCOS-friendly plan to manage weight and hormonal health.");
    }
    

    return rec;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = recommendTestsFromSymptoms(formData);
    setRecommendations(result);

  };

  const handleClear = () => {
    setFormData({
      cycle: '',
      weightGain: '',
      hairGrowth: '',
      skinDarkening: '',
      hairLoss: '',
      pimples: '',
      fastFood: '',
      exercise: ''
    });
    setRecommendations(null); // Reset recommendations as well
  };

  return (
    <div className="container symptom-checker-container">
      <h2 className="text-center my-4">🩺 PCOS Symptom Checker</h2>
      <form className="symptom-form" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Menstrual Cycle</label>
          {/* Custom Dropdown */}
          <div className="select-wrapper">
            <select 
              name="cycle" 
              value={formData.cycle} 
              onChange={handleChange} 
              className="form-select cycle-dropdown" 
              required
              aria-label="Menstrual Cycle">
              <option value="">--Select--</option>
              <option value="R">Regular</option>
              <option value="I">Irregular</option>
            </select>
          </div>
        </div>

        {["weightGain", "hairGrowth", "skinDarkening", "hairLoss", "pimples", "fastFood", "exercise"].map(field => (
          <div className="mb-3" key={field}>
            <label className="form-label">
              {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')} (Y/N)
            </label>
            <div className="select-wrapper">

            <select name={field} value={formData[field]} onChange={handleChange} className="form-select" required>
              <option value="">--Select--</option>
              <option value="Y">Yes</option>
              <option value="N">No</option>
            </select>
            </div>
          </div>
        ))}

        <div className="d-flex justify-content-between button-container">
          <button type="submit" className="btn btn-primary button">Submit</button>
          <button type="button" onClick={handleClear} className="btn btn-secondary button">Clear</button>
        </div>
      </form>

      {recommendations && (
        <div className="recommendations mt-4">
          <h3>🔍 Test Recommendations</h3>
          {recommendations.Suggested_Tests.length > 0 ? (
            <div className="d-flex flex-column">
              {recommendations.Suggested_Tests.map((test, idx) => (
                <div className="d-flex flex-row mb-3 test-cards" key={idx}>
                  <div className="card p-3 test-card w-100">
                    <h4>{test.icon} {test.name}</h4>
                    <p>{test.description}</p>
                    <strong>Includes:</strong> <em>{test.tests_included.join(', ')}</em>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card p-3 test-card w-100 ">
            <p>✅ No specific tests recommended based on current symptoms.</p>

              </div>
          )}

          {recommendations.Lifestyle_Recommendations.length > 0 && (
            <div className="card p-3 test-card w-100">
              <h3>🌱 Lifestyle Tips</h3>
              <ul>
                {recommendations.Lifestyle_Recommendations.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SymptomCheckerPage;
