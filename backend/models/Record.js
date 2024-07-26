const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recordSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  allergies: {
    type: String,
    required: false
  },
  heart_rate: {
    type: String,
    required: false
    },
  blood_pressure: {
    type: String,
    required: false
  },
  pre_existing_conditions: {
    type: String,
    required: false
  },
  medications: {
    type: String,
    required: false
  },
  procedures: {
    type: String,
    required: false
  },
}, {
  timestamps: false
});


module.exports = mongoose.model('Record', recordSchema);