const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const router = express.Router();
const User = require('../models/User')

const SECRET_KEY = 'd9e5b2c254d5d20df7ba72d3854bddc3402675bd688b856ccb3723cdf0c68911a2112f18e074e810e0f22bf0cba0ed93a8dd6202e7944a54f1303bf2035e8b73'; // JWT secret key

// Register route
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }

  const userToFind = await User.findOne({username: req.body.username })
  if(userToFind){
    return res.status(400).send('Username already exists');
  }

  // Hash the password before storing it
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: hashedPassword,
    role: req.body.role
})
  
  try{
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
});

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }

  try{
  const user = await User.findOne({username: req.body.username })
  if (!user) {
    return res.status(400).send('Invalid credentials');
  }

  // Compare the provided password with the stored hashed password
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(400).send('Invalid credentials');
  }

  // Generate JWT token
  const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });
  // Return selected user properties
  const userResponse = {
    role: user.role,
    firstName: user.firstName, // Example of another property to return
    lastName: user.lastName, // Add any other fields you want to expose
    id: user.id,
  };

  res.json({ token, user: userResponse });
} catch (err) {
    console.error(err);
    res.status(500).send('Error logging in');
  }
});

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).send('Access denied');
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // Store the decoded user info (for future use)
    next();
  } catch (err) {
    return res.status(400).send('Invalid token');
  }
}

// Protected route (accessible only with valid JWT)
router.get('/protected', verifyToken, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});


module.exports = router, {verifyToken};
