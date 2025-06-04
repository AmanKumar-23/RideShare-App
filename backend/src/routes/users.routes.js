const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const User = require('../models/user.model');
const Ride = require('../models/ride.model');

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { name, phone, profileImage } = req.body;
    const user = await User.findById(req.user._id);
    
    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (profileImage) user.profileImage = profileImage;
    
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's bookings
router.get('/bookings', auth, async (req, res) => {
  try {
    const rides = await Ride.find({
      'passengers.user': req.user._id
    })
    .populate('driver', 'name email phone rating')
    .populate('passengers.user', 'name email phone');
    
    res.json(rides);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's rides (as driver)
router.get('/rides', auth, async (req, res) => {
  try {
    const rides = await Ride.find({
      driver: req.user._id
    })
    .populate('driver', 'name email phone rating')
    .populate('passengers.user', 'name email phone');
    
    res.json(rides);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;