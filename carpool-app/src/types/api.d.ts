interface APIEndpoints {
  // Authentication
  'POST /api/auth/register': RegisterDTO;
  'POST /api/auth/login': LoginDTO;
  
  // Rides
  'GET /api/rides': RideSearchParams;
  'POST /api/rides': CreateRideDTO;
  'GET /api/rides/:id': RideDetailsDTO;
  'POST /api/rides/:id/book': BookingDTO;
  
  // User
  'GET /api/user/profile': UserProfileDTO;
  'PUT /api/user/profile': UpdateProfileDTO;
  'GET /api/user/bookings': UserBookingsDTO;
  'GET /api/user/rides': UserRidesDTO;
}