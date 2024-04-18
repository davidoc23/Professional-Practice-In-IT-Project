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
  tempo: Number
});

// Define a model for users
const User = mongoose.model('User', UserSchema);

// Define a model for workouts
const Workout = mongoose.model('Workout', WorkoutSchema);



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
app.post('/api/workouts', async (req, res) => {
  const { category, time, rounds, tempo } = req.body;

  try {
    // Create a new workout with the provided data
    const newWorkout = new Workout({ category, time, rounds, tempo });

    // Save the new workout to the database
    await newWorkout.save();

    // Respond with a success message
    return res.status(201).json({ message: 'Workout created successfully' });
  } catch (error) {
    // If an error occurs, respond with an internal server error
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
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
