const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

module.exports = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
    
    // Extract token from Bearer format
    const token = authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
    
    // Verify token and log the decoded content
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);
    
    // Fetch complete user object from database using userId from token
    const user = await User.findById(decoded.userId).select('-password');
    console.log('Found user:', user ? 'Yes' : 'No');
    
    if (!user) {
      console.log('User not found for id:', decoded.userId);
      return res.status(401).json({ message: 'User not found' });
    }
    
    // Add complete user object to request
    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token has expired' });
    }
    res.status(401).json({ message: 'Token is not valid' });
  }
};