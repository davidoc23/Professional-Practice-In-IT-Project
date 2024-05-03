//Require the Mongoose library
const mongoose = require('mongoose');
//Define the schema for the workout data using Mongoose
const workoutSchema = new mongoose.Schema({
  //Define the category field with type String and required property set to true
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
//Create a Mongoose model named Workout using the defined schema
const Workout = mongoose.model('BoxingWorkout', workoutSchema);

module.exports = Workout;
