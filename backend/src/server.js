const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const socketIo = require('socket.io');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');

dotenv.config();

const app = express();
const server = http.createServer(app);
// Initialize Socket.io with CORS configuration
const io = socketIo(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Security middleware - REORDERED
app.use(express.json()); // Must come first
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Modified mongoSanitize configuration
app.use((req, res, next) => {
  if (req.query) {
    req.query = mongoSanitize.sanitize(req.query);
  }
  if (req.body) {
    req.body = mongoSanitize.sanitize(req.body);
  }
  next();
});

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api', limiter);

app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
const ridesRoutes = require('./routes/rides.routes');
app.use('/api/rides', ridesRoutes);
app.use('/api/user', require('./routes/users.routes'));  // Changed from '/api/user/profile'

// Socket.io connection
io.on('connection', (socket) => {
  console.log('A user connected');
  
  socket.on('join-ride', (rideId) => {
    socket.join(`ride-${rideId}`);
  });
  
  socket.on('send-message', (data) => {
    io.to(`ride-${data.rideId}`).emit('receive-message', data);
  });
  
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    mongoose.connection.close(false, () => {
      console.log('MongoDB connection closed');
      process.exit(0);
    });
  });
});