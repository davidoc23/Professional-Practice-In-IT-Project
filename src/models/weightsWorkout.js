const mongoose = require('mongoose');

const weightsWorkoutSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  exercise: String,
  repRange: Number,
  weightLifted: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const WeightsWorkout = mongoose.model('WeightsWorkout', weightsWorkoutSchema);

module.exports = WeightsWorkout;
