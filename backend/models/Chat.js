const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = Schema({
  role: {
    type: String,
    required: true,
    enum: ['user', 'system']
  },
  content: {
    type: String,
    required: true,
  },
}, { _id: false });

const chatSchema = Schema({
  messages: [messageSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

chatSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Chat', chatSchema);