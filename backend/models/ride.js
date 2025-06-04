const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // ... existing code ...
  status: {
    type: String,
    enum: ['scheduled', 'in-progress', 'completed', 'cancelled'],
    default: 'scheduled'
  },
  // Add these new fields
  route: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: [{
      type: Number
    }]
  },
  estimatedDuration: {
    type: Number,
    required: true
  },
  actualStartTime: Date,
  actualEndTime: Date,
  ratings: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    review: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  // ... existing code ...
}, {
  timestamps: true
});

// Add indexes for better query performance
rideSchema.index({ from: 1, to: 1 });
rideSchema.index({ date: 1 });
rideSchema.index({ status: 1 });
rideSchema.index({ route: '2dsphere' });

module.exports = mongoose.model('Ride', rideSchema);