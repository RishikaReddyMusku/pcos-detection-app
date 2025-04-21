import React, { useState } from 'react'; 
import axios from '../api/axios';
import '../styles/ClinicalQuestionsPage.css';

const ClinicalQuestionsPage = () => {
  const [formData, setFormData] = useState({
    hb: '', betaHCG1: '', betaHCG2: '', fsh: '', lh: '', fshLhRatio: '', tsh: '', amh: '',
    prl: '', vitD3: '', prg: '', rbs: '', cycle: '', cycleLength: '', pregnant: '',
    abortions: '', follicleL: '', follicleR: '', avgFL: '', avgFR: '', endometrium: '',
    bmi: '', hip: '', waist: '', waistHipRatio: '', bpSys: '', bpDia: '',
    marriageYears: '', weightGain: '', hairGrowth: '', skinDarkening: '', hairLoss: '',
    pimples: '', fastFood: '', regularExercise: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
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
        pregnant: formData.pregnant,
        abortions: formData.abortions,
        follicleL: formData.follicleL,
        follicleR: formData.follicleR,
        avgFL: formData.avgFL,
        avgFR: formData.avgFR,
        endometrium: formData.endometrium
      },
      bodyMetrics: {
        bmi: formData.bmi,
        hip: formData.hip,
        waist: formData.waist,
        waistHipRatio: formData.waistHipRatio,
        bpSys: formData.bpSys,
        bpDia: formData.bpDia
      },
      lifestyleAndSymptoms: {
        marriageYears: formData.marriageYears,
        weightGain: formData.weightGain,
        hairGrowth: formData.hairGrowth,
        skinDarkening: formData.skinDarkening,
        hairLoss: formData.hairLoss,
        pimples: formData.pimples,
        fastFood: formData.fastFood,
        regularExercise: formData.regularExercise
      }
    };

    try {
      await axios.post('/clinical/submit', payload);
      alert('Data submitted successfully!');
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="clinical-form-wrapper">
      <h2>🧬 Enter Clinical Information for PCOS Detection</h2>
      <form onSubmit={handleSubmit} className="clinical-form">

        <fieldset>
          <legend>🩸 Blood Test Information</legend>
          <div className="form-grid">
            {[
              ['hb', 'Hb (g/dl)'], ['betaHCG1', 'I beta-HCG'], ['betaHCG2', 'II beta-HCG'],
              ['fsh', 'FSH'], ['lh', 'LH'], ['fshLhRatio', 'FSH/LH Ratio'], ['tsh', 'TSH'],
              ['amh', 'AMH'], ['prl', 'PRL'], ['vitD3', 'Vitamin D3'], ['prg', 'PRG'], ['rbs', 'RBS']
            ].map(([name, label]) => (
              <label key={name}>
                {label}
                <input name={name} onChange={handleChange} />
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>👩‍⚕️ Reproductive Health</legend>
          <div className="form-grid">
            {[
              ['cycle', 'Cycle (R/I)'], ['cycleLength', 'Cycle Length (days)'],
              ['pregnant', 'Pregnant (Y/N)'], ['abortions', 'No. of Abortions'],
              ['follicleL', 'Follicle No. (L)'], ['follicleR', 'Follicle No. (R)'],
              ['avgFL', 'Avg F size (L)'], ['avgFR', 'Avg F size (R)'], ['endometrium', 'Endometrium (mm)']
            ].map(([name, label]) => (
              <label key={name}>
                {label}
                <input name={name} onChange={handleChange} />
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>📏 Body Metrics</legend>
          <div className="form-grid">
            {[
              ['bmi', 'BMI'], ['hip', 'Hip (inch)'], ['waist', 'Waist (inch)'],
              ['waistHipRatio', 'Waist:Hip Ratio'], ['bpSys', 'BP Systolic'], ['bpDia', 'BP Diastolic']
            ].map(([name, label]) => (
              <label key={name}>
                {label}
                <input name={name} onChange={handleChange} />
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>👩‍⚕️ Lifestyle & Symptoms</legend>
          <div className="form-grid">
          <label>
          Marriage Status (Yrs)
          <input name="marriageYears" onChange={handleChange} />
        </label>

    {[
      ['weightGain', 'Weight gain'],
      ['hairGrowth', 'Hair growth'],
      ['skinDarkening', 'Skin darkening'],
      ['hairLoss', 'Hair loss'],
      ['pimples', 'Pimples'],
      ['fastFood', 'Fast food'],
      ['regularExercise', 'Reg. Exercise']
    ].map(([name, label]) => (
      <label key={name}>
        {label} (Y/N)
        <select name={name} onChange={handleChange} defaultValue="">
          <option value="" disabled>Select</option>
          <option value="Y">Yes</option>
          <option value="N">No</option>
        </select>
      </label>
    ))}
  </div>
</fieldset>


        <button type="submit" className="submit-btn">🚀 Submit Clinical Data</button>
      </form>
    </div>
  );
};

export default ClinicalQuestionsPage;
