const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import the User model
const User = require('../src/models/user');
const Workout = require('../src/models/BoxingWorkout');
const CardioWorkout = require('../src/models/cardioWorkout');
const WeightWorkout = require('../src/models/weightsWorkout'); 

const app = express();
const port = process.env.PORT || 4001;

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://admin:admin@cluster0.hcqirr6.mongodb.net/fitFushionAppDB?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("MongoDB connected successfully");
}).catch(err => console.log(err));

// Route for fetching all workouts associated with the logged-in user
app.get('/api/all-workouts', async (req, res) => {
  try {
    // Retrieve the user ID from the request headers
    const userId = req.headers['username'];

    // Fetch all workouts associated with the user
    const boxingWorkouts = await Workout.find({ userId });
    const cardioWorkouts = await CardioWorkout.find({ userId });
    const weightsWorkouts = await WeightWorkout.find({ userId });

    // Combine all workouts into a single array
    const allWorkouts = [...boxingWorkouts, ...cardioWorkouts, ...weightsWorkouts];

    // Respond with the combined list of workouts
    res.status(200).json(allWorkouts);
  } catch (error) {
    console.error('Error fetching workouts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Route for fetching all boxing workouts associated with the logged-in user
app.get('/api/boxing-workouts', async (req, res) => {
  try {
    // Retrieve the user ID from the request headers
    const userId = req.headers['username'];

    // Fetch all boxing workouts associated with the user
    const boxingWorkouts = await Workout.find({ userId });

    // Respond with the list of boxing workouts
    res.status(200).json(boxingWorkouts);
  } catch (error) {
    console.error('Error fetching boxing workouts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route for fetching all cardio workouts associated with the logged-in user
app.get('/api/cardio-workouts', async (req, res) => {
  try {
    // Retrieve the user ID from the request (assuming it's included in the request headers)
    const userId = req.headers['username'];

    // Fetch all cardio workouts associated with the user
    const cardioWorkouts = await CardioWorkout.find({ user: userId });

    // Respond with the list of cardio workouts
    res.status(200).json(cardioWorkouts);
  } catch (error) {
    console.error('Error fetching cardio workouts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route for fetching all weights workouts associated with the logged-in user
app.get('/api/weights-workouts', async (req, res) => {
  try {
    // Retrieve the user ID from the request (assuming it's included in the request headers)
    const userId = req.headers['username'];

    // Fetch all weights workouts associated with the user
    const weightsWorkouts = await WeightWorkout.find({ user: userId });

    // Respond with the list of weights workouts
    res.status(200).json(weightsWorkouts);
  } catch (error) {
    console.error('Error fetching weights workouts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route for user registration (create account)
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    const newUser = new User({ username, password });
    await newUser.save();
    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Route for user authentication
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Authentication failed. User not found.' });
    }

    if (password === user.password) {
      return res.status(200).json({ message: 'Authentication successful' });
    } else {
      return res.status(401).json({ message: 'Authentication failed. Incorrect password.' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to check if a user already exists
app.post('/api/checkUser', async (req, res) => {
    const { username } = req.body;
  
    try {
      const user = await User.findOne({ username });
  
      if (user) {
        return res.status(200).json({ exists: true });
      } else {
        return res.status(200).json({ exists: false });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });

// Route for creating a new workout
app.post('/api/boxing-workouts', async (req, res) => {
  const { userId, category, time, rounds, tempo } = req.body;

  try {
    const newWorkout = new Workout({ userId, category, time, rounds, tempo });
    await newWorkout.save();
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
      _id: new mongoose.Types.ObjectId(),
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

// Adding a new weights workout
app.post('/api/weights-workouts', async (req, res) => {
  const { category, exercise, repRange, weightLifted  } = req.body;
  const workout = new WeightWorkout({
    category, exercise, repRange, weightLifted 
  });

  try {
    await workout.save();
    res.status(201).json(workout);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE route to remove a cardio workout by ID
app.delete('/api/cardio-workouts/:id', async (req, res) => {
  try {
    const workoutId = req.params.id;
    const deletedWorkout = await CardioWorkout.findByIdAndDelete(workoutId);
    if (!deletedWorkout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    res.status(200).json({ message: 'Workout deleted successfully', deletedWorkout });
  } catch (error) {
    console.error('Error deleting cardio workout:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// DELETE route to remove a boxing workout by ID
app.delete('/api/boxing-workouts/:id', async (req, res) => {
  try {
    const workoutId = req.params.id;
    const deletedWorkout = await Workout.findByIdAndDelete(workoutId);
    if (!deletedWorkout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    res.status(200).json({ message: 'Workout deleted successfully', deletedWorkout });
  } catch (error) {
    console.error('Error deleting boxing workout:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

/*Deleting a weights workout */
app.delete('/api/weights-workouts/:id', async (req, res) => {
  try {
    const workout = await WeightWorkout.findByIdAndDelete(req.params.id);
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    res.status(200).json({ message: 'Workout deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a weights workout
app.put('/api/weights-workouts/:id', async (req, res) => {
  const { category, exercise, repRange, weightLifted } = req.body;
  try {
    const workout = await WeightWorkout.findByIdAndUpdate(req.params.id, { category, exercise, repRange, weightLifted 
    }, { new: true });

    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    res.status(200).json(workout);
  } catch (err) {
    res.status(500).json({ message: err.message });
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
