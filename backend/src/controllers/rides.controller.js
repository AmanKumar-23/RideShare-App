const Ride = require('../models/ride.model');

exports.createRide = async (req, res) => {
  try {
    const ride = new Ride({
      ...req.body,
      driver: req.user.id,
      status: 'scheduled'
    });
    await ride.save();
    res.status(201).json(ride);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getRides = async (req, res) => {
  try {
    const { from, to, date } = req.query;
    const query = {};
    
    if (from) query.from = from;
    if (to) query.to = to;
    if (date) {
      const startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);
      query.date = { $gte: startDate, $lte: endDate };
    }

    const rides = await Ride.find(query)
      .populate('driver', 'name rating avatar')
      .sort({ date: 1 });
      
    res.json(rides);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};