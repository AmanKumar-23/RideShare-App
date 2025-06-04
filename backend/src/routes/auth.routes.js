const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const User = require('../models/user.model');

// Register route
router.post('/register',
  [
    body('name').notEmpty().trim(),
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    body('phone').notEmpty()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, email, password, phone } = req.body;
      
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }

      user = new User({
        name,
        email,
        password,
        phone
      });

      await user.save();
      console.log('User created with ID:', user._id);
      
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '24h'
      });
      console.log('Token generated for new user');

      const userData = {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone
      };

      res.status(201).json({ token, user: userData });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Server error' });
    }
});

// Login route
router.post('/login',
  [
    body('email').isEmail(),
    body('password').exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;
      
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      console.log('User authenticated with ID:', user._id);
      
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '24h'
      });
      console.log('Token generated for login');

      // Return user data (excluding password) along with token
      const userData = {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone
      };

      res.json({ token, user: userData });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;