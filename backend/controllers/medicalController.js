const MedicalForm = require('../models/MedicalForm');
const User = require('../models/User');

const submitMedicalForm = async (req, res) => {
  const {
    fullName,
    fatherOrSpouseName,
    age,
    height,
    weight,
    sex,
    bloodGroup,
    address,
    familyHistory
  } = req.body;

  try {
    const userId = req.user.id;

    const newForm = new MedicalForm({
      userId,
      fullName,
      fatherOrSpouseName,
      age,
      height,
      weight,
      sex,
      bloodGroup,
      address,
      familyHistory
    });

    await newForm.save();

    await User.findByIdAndUpdate(userId, { hasSubmittedMedicalForm: true });

    res.status(201).json({ message: 'Medical form submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

module.exports = { submitMedicalForm };
