const Clinical = require('../models/Clinical');
const axios = require('axios');

exports.submitClinical = async (req, res) => {
  const userId = req.user.id;
  const { medicalProfile, bloodTest, reproductiveHealth, bodyMetrics, lifestyleAndSymptoms } = req.body;

  try {
    // 1. Save to MongoDB
    await Clinical.deleteMany({ userId });

    const clinical = new Clinical({
      userId,
      medicalProfile,
      bloodTest,
      reproductiveHealth,
      bodyMetrics,
      lifestyleAndSymptoms
    });

    await clinical.save();

    // 2. Forward to ML model for prediction (port 5002)
    const mlRes = await axios.post('http://127.0.0.1:5002/clinical/submit', {
      medicalProfile,
      bloodTest,
      reproductiveHealth,
      bodyMetrics,
      lifestyleAndSymptoms
    });

    const prediction = mlRes.data.pcos_prediction;

    // 3. Send response back to frontend
    return res.status(201).json({
      message: 'Clinical data saved and predicted successfully',
      clinical,
      pcos_prediction: prediction
    });

  } catch (error) {
    console.error('Error in clinical submission:', error);
    return res.status(500).json({ error: 'Something went wrong during clinical submission' });
  }
};
