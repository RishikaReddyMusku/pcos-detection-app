const mongoose = require('mongoose');

const ClinicalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bloodTest: {
    hb: String,
    betaHCG1: String,
    betaHCG2: String,
    fsh: String,
    lh: String,
    fshLhRatio: String,
    tsh: String,
    amh: String,
    prl: String,
    vitD3: String,
    prg: String,
    rbs: String
  },
  reproductiveHealth: {
    cycle: String,
    cycleLength: String,
    pregnant: String,
    abortions: String,
    follicleL: String,
    follicleR: String,
    avgFL: String,
    avgFR: String,
    endometrium: String
  },
  bodyMetrics: {
    bmi: String,
    hip: String,
    waist: String,
    waistHipRatio: String,
    bpSys: String,
    bpDia: String
  },
  lifestyleAndSymptoms: {
    marriageYears: String,
    weightGain: String,
    hairGrowth: String,
    skinDarkening: String,
    hairLoss: String,
    pimples: String,
    fastFood: String,
    regularExercise: String
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Clinical', ClinicalSchema);