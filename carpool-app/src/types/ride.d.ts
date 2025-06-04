interface Ride {
  _id: string;
  driver: User;
  from: string;
  to: string;
  date: Date;
  departureTime: string;
  seats: number;
  price: number;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  passengers: User[];
  carDetails: {
    model: string;
    color: string;
    plateNumber: string;
  };
  createdAt: Date;
  updatedAt: Date;
}