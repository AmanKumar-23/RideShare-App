const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const Ride = require('../models/ride.model');

// Create a new ride
router.post('/', auth, async (req, res) => {
    try {
        console.log('Received ride creation request:', req.body);
        console.log('User from auth middleware:', req.user);

        const { from, to, date, departureTime, seats, price, carDetails, status } = req.body;
        
        // Log the data being used to create the ride
        console.log('Creating ride with data:', {
            from,
            to,
            date: new Date(date),
            departureTime,
            seats,
            price,
            carDetails,
            status,
            driver: req.user._id
        });

        // When creating a ride
        const ride = new Ride({
            from,
            to,
            date: new Date(date + 'T12:00:00Z'), // Force UTC noon time to avoid timezone issues
            departureTime,
            seats,
            price,
            carDetails,
            status,
            driver: req.user._id,
            passengers: []
        });

        console.log('Ride model instance created:', ride);

        await ride.save();
        console.log('Ride saved successfully');
        
        res.status(201).json(ride);
    } catch (error) {
        console.error('Error in ride creation:', error);
        console.error('Error details:', {
            name: error.name,
            message: error.message,
            stack: error.stack
        });
        res.status(500).json({ 
            message: 'Server error',
            error: error.message,
            details: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
});

// Get all rides (with filtering)
router.get('/', async (req, res) => {
  try {
    const { from, to, date, status, seats } = req.query;
    console.log('Received search params:', { from, to, date, status, seats });
    
    // Build query object
    const query = {};
    if (from) query.from = from;
    if (to) query.to = to;
    if (date) {
      // Handle date filtering with timezone consideration
      const dateObj = new Date(date);
      
      // Create start date (beginning of the day in local timezone)
      const startDate = new Date(dateObj);
      startDate.setHours(0, 0, 0, 0);
      
      // Create end date (end of the day in local timezone)
      const endDate = new Date(dateObj);
      endDate.setHours(23, 59, 59, 999);
      
      console.log(`Filtering rides between ${startDate.toISOString()} and ${endDate.toISOString()}`);
      
      query.date = { $gte: startDate, $lte: endDate };
    }
    if (status) query.status = status;
    
    // Add seats filter directly to the MongoDB query if provided
    if (seats && !isNaN(parseInt(seats, 10))) {
      const seatsRequired = parseInt(seats, 10);
      query.seats = { $gte: seatsRequired };
      console.log(`Filtering rides with at least ${seatsRequired} seats available`);
    }
    
    console.log('Final MongoDB query:', JSON.stringify(query));
    
    const rides = await Ride.find(query)
      .populate('driver', 'name email phone rating')
      .sort({ date: 1 });
    
    console.log(`Found ${rides.length} rides matching criteria`);
    
    res.json(rides);
  } catch (error) {
    console.error('Error fetching rides:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;