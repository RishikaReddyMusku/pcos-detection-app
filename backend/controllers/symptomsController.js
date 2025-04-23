const Symptom = require('../models/Symptom');

exports.submitSymptoms = async (req, res) => {
  const userId = req.user.id;
  const {
    marriageYears,
    weightGain,
    hairGrowth,
    skinDarkening,
    hairLoss,
    pimples,
    fastFood,
    exercise
  } = req.body;

  try {
    // ✅ Delete previous symptoms for the user
    await Symptom.deleteMany({ userId });

    // ✅ Save the latest one
    const symptom = new Symptom({
      userId,
      marriageYears,
      weightGain,
      hairGrowth,
      skinDarkening,
      hairLoss,
      pimples,
      fastFood,
      exercise
    });

    await symptom.save();
    res.status(201).json({ message: 'Symptoms submitted successfully', symptom });
  } catch (error) {
    console.error('Error saving symptoms:', error);
    res.status(500).json({ error: 'Failed to save symptoms' });
  }
};