interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  profileImage?: string;
  rating: number;
  ridesOffered: number;
  ridesBooked: number;
  verified: boolean;
  createdAt: Date;
}