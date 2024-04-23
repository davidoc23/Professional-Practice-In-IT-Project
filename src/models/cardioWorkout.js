const mongoose = require('mongoose');

const cardioWorkoutSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  time: String,
  distance: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const CardioWorkout = mongoose.model('CardioWorkout', cardioWorkoutSchema);

module.exports = CardioWorkout;
