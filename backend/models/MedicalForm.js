// backend/models/MedicalForm.js
const mongoose = require('mongoose');

const MedicalFormSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: { type: String, required: true },
  dob: { type: String, required: true },
  age: { type: String, required: true },
  gender: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  height: { type: String, required: true },
  weight: { type: String, required: true },
  vaccination: String,
  reports: String
}, {
  timestamps: true
});

module.exports = mongoose.model('MedicalForm', MedicalFormSchema);
