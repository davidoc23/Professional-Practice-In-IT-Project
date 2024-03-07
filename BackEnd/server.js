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
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB connected successfully");
}).catch(err => console.log(err));

// Define a schema for users
const UserSchema = new mongoose.Schema({
  username: String,
  password: String
});

// Define a model for users
const User = mongoose.model('User', UserSchema);

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
