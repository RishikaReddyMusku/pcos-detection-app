const Clinical = require('../models/Clinical');

exports.submitClinical = async (req, res) => {
  const userId = req.user.id;
  const { bloodTest, reproductiveHealth, bodyMetrics,lifestyleAndSymptoms } = req.body;

  try {
    // ✅ Remove any previous clinical data for the user
    await Clinical.deleteMany({ userId });

    // ✅ Save new clinical entry
    const clinical = new Clinical({
      userId,
      bloodTest,
      reproductiveHealth,
      bodyMetrics,
      lifestyleAndSymptoms 
       });

    await clinical.save();
    res.status(201).json({ message: 'Clinical data submitted successfully', clinical });
  } catch (error) {
    console.error('Error saving clinical data:', error);
    res.status(500).json({ error: 'Failed to save clinical data' });
  }
};
