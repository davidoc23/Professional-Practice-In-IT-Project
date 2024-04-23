const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  time: String,
  rounds: Number,
  tempo: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const Workout = mongoose.model('BoxingWorkout', workoutSchema);

module.exports = Workout;
