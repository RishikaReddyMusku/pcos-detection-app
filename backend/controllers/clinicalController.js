const Clinical = require('../models/Clinical');

// Submit clinical data (overwrites previous)
exports.submitClinical = async (req, res) => {
  const userId = req.user.id;
  const { bloodTest, reproductiveHealth, bodyMetrics, lifestyleAndSymptoms } = req.body;

  try {
    // Remove any existing data for this user
    await Clinical.deleteMany({ userId });

    // Save new data
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

// Fetch latest clinical data for the user
exports.getMyClinicalData = async (req, res) => {
  try {
    const clinical = await Clinical.findOne({ userId: req.user.id }).sort({ createdAt: -1 });
    if (!clinical) {
      return res.status(404).json({ message: 'No clinical data found' });
    }
    res.json(clinical);
  } catch (err) {
    console.error('❌ Error fetching clinical:', err);
    res.status(500).json({ error: 'Failed to fetch clinical data' });
  }
};
