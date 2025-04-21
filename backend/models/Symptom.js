const mongoose = require('mongoose');

const SymptomSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  marriageYears: Number,
  weightGain: String, // Y/N
  hairGrowth: String, // Y/N
  skinDarkening: String, // Y/N
  hairLoss: String, // Y/N
  pimples: String, // Y/N
  fastFood: String, // Y/N
  exercise: String, // Y/N
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Symptom', SymptomSchema);