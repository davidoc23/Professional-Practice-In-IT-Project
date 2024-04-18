const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 4001;

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://admin:admin@cluster0.hcqirr6.mongodb.net/fitFushionAppDB?retryWrites=true&w=majority', {

  // This block of code executes when the connection to MongoDB is successful
}).then(() => {
  console.log("MongoDB connected successfully");
  // This block of code executes when there's an error connecting to MongoDB
}).catch(err => console.log(err));// Log the error to the console
 
// Define a schema for users
const UserSchema = new mongoose.Schema({
  username: String,
  password: String
});

// Define a schema for workouts
const WorkoutSchema = new mongoose.Schema({
  category: String,
  time: String,
  rounds: Number,
  tempo: Number,
  // Add a reference to the user who created the workout
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// Define a schema for cardio workouts
const CardioSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, // Define a unique identifier for the workout
  category: String,
  time: String,
  distance: String,
  // Add a reference to the user who created the workout
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// Define a model for users
const User = mongoose.model('User', UserSchema);

// Define a model for workouts
const Workout = mongoose.model('Workout', WorkoutSchema);

// Define a model for cardio workouts
const CardioWorkout = mongoose.model('CardioWorkout', CardioSchema);

// Route for fetching all workouts associated with a user
app.get('/api/boxing-workouts', async (req, res) => {
  try {
    // Retrieve all workouts from the database
    const workouts = await Workout.find({ userId: req.query.userId });
    // Respond with the workouts
    res.status(200).json(workouts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to fetch all cardio workouts
app.get('/api/cardio-workouts', async (req, res) => {
  try {
    // Fetch all cardio workouts from the database
    const workouts = await CardioWorkout.find();
    // Send the list of workouts as a response
    res.status(200).json(workouts);
  } catch (error) {
    // Handle errors
    console.error('Error fetching cardio workouts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// Route for user registration (create account)
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username is already taken
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      // If the username is already taken, respond with a 409 (Conflict) status
      return res.status(409).json({ message: 'Username already exists' });
    }

    // Create a new user with the provided username and password
    const newUser = new User({ username, password });

    // Save the new user to the database
    await newUser.save();

    // Respond with a success message
    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    // If an error occurs, respond with an internal server error
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


// Route for user authentication
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists in the database
    const user = await User.findOne({ username });

    if (!user) {
      // If the user does not exist, respond with authentication failure
      return res.status(401).json({ message: 'Authentication failed. User not found.' });
    }

    // Check if the password is correct
    if (password === user.password) {
      // If the password is correct, respond with authentication success
      return res.status(200).json({ message: 'Authentication successful' });
    } else {
      // If the password is incorrect, respond with authentication failure
      return res.status(401).json({ message: 'Authentication failed. Incorrect password.' });
    }
  } catch (error) {
    // If an error occurs, respond with an internal server error
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to check if a user already exists
app.post('/api/checkUser', async (req, res) => {
    const { username } = req.body;
  
    try {
      // Check if the user exists in the database
      const user = await User.findOne({ username });
  
      if (user) {
        // If the user exists, respond with exists: true
        return res.status(200).json({ exists: true });
      } else {
        // If the user does not exist, respond with exists: false
        return res.status(200).json({ exists: false });
      }
    } catch (error) {
      // If an error occurs, respond with an internal server error
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });


// Route for creating a new workout
app.post('/api/boxing-workouts', async (req, res) => {
  const { userId, category, time, rounds, tempo } = req.body;

  try {
    // Create a new workout instance
    const newWorkout = new Workout({ userId, category, time, rounds, tempo });
    // Save the workout to the database
    await newWorkout.save();
    // Respond with success message
    res.status(201).json({ message: 'Workout created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// POST route to save a new cardio workout
app.post('/api/cardio-workouts', async (req, res) => {
  try {
    const { category, time, distance } = req.body;
    const newWorkout = new CardioWorkout({
      _id: new mongoose.Types.ObjectId(), // Generate a unique ID for the workout
      category,
      time,
      distance
    });
    await newWorkout.save();
    res.status(201).json({ message: 'Cardio workout created successfully', workout: newWorkout });
  } catch (error) {
    console.error('Error creating cardio workout:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// DELETE route to remove a cardio workout by ID
app.delete('/api/cardio-workouts/:id', async (req, res) => {
  try {
    const workoutId = req.params.id;
    // Use Mongoose's findByIdAndDelete method to find and delete the workout by ID
    const deletedWorkout = await CardioWorkout.findByIdAndDelete(workoutId);
    if (!deletedWorkout) {
      // If the workout with the specified ID does not exist, respond with a 404 status
      return res.status(404).json({ message: 'Workout not found' });
    }
    res.status(200).json({ message: 'Workout deleted successfully', deletedWorkout });
  } catch (error) {
    console.error('Error deleting cardio workout:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



// simple route
app.get('/', (req, res) => {
  res.send('Welcome to FitFusion App');
});

// API route
app.get('/api/sample', (req, res) => {
  res.json({ message: 'This is a sample API route' });
});

// a route for handling 404 errors
app.use((req, res, next) => {
  res.status(404).send("Sorry, can't find that!");
});

// a route for handling errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
