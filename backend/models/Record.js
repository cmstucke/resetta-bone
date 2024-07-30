const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recordSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date
  },
  biologicalGender: {
    type: String
  },
  smokingStatus: {
    type: String
  },
  alcoholConsumption: {
    type: String
  },
  exerciseFrequency: {
    type: String
  },
  emergencyContacts: [{
    name: String,
    phone: String,
    relationship: String
  }],
  familyHistory: [{
    condition: String,
    relation: String,
    notes: String
  }],
  labResults: [{
    testName: String,
    result: String,
    date: Date,
    notes: String
  }],
  immunizations: [{
    vaccine: String,
    date: Date,
    boosterRequired: Boolean
  }],
  DNR: {
    type: Boolean
  },
  organDonor: {
    type: Boolean
  },
  allergies: [{
    allergy: String,
    reaction: String,
    severity: String,
  }],
  heartRates: [{
    date: Date,
    time: String,
    heartRate: Number,
  }],
  bloodPressures: [{
    date: Date,
    time: String,
    systolic: Number,
    diastolic: Number,
  }],
  preExistingConditions: [{
    condition: String,
    diagnosisDate: Date,
    notes: String,
  }],
  medications: [{
    medication: String,
    dosage: String,
    frequency: String,
  }],
  procedures: [{
    procedure: String,
    date: Date,
    surgeon: String,
  }],
}, {
  timestamps: false
});


module.exports = mongoose.model('Record', recordSchema);