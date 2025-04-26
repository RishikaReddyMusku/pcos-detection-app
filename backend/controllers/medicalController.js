const MedicalForm = require('../models/MedicalForm');
const User = require('../models/User');

const submitMedicalForm = async (req, res) => {
  const {
    name,
    dob,
    age,
    mobile,
    email,
    bloodGroup,
    height,
    weight,
    vaccination,
    reports
  } = req.body;

  try {
    const userId = req.user.id;

    const newForm = new MedicalForm({
      user: userId,
      name,
      dob,
      age,
      mobile,
      email,
      bloodGroup,
      height,
      weight,
      vaccination,
      reports
    });

    await newForm.save();

    await User.findByIdAndUpdate(userId, { hasSubmittedMedicalForm: true });

    res.status(201).json({ message: 'Medical form submitted successfully' });
  } catch (error) {
    console.error('Error in submitting medical form:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

module.exports = { submitMedicalForm };
