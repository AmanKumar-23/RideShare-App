'use client';
import { useQuery } from '@tanstack/react-query';
import { ridesAPI } from '@/services/api';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Define ride type
interface Ride {
  id: string | number;
  from: string;
  to: string;
  seats: number;
  price: number;
  date?: string;
  departureTime?: string;
  driver?: {
    name: string;
    rating: number;
    trips: number;
    avatar: string;
  };
}

export function RideListContent() {
  const { data: rides = [], isLoading, error } = useQuery({
    queryKey: ['rides'],
    queryFn: async () => {
      const result = await ridesAPI.getAllRides({ status: 'scheduled' });
      return result;
    },
  });

  if (isLoading) return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(3)].map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
  if (error) return (
    <div className="text-red-500">
      Error: {error instanceof Error ? error.message : 'Failed to fetch rides'}
    </div>
  );

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Available Rides</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {rides.map((ride: Ride) => (
          <Card key={ride.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{ride.from} → {ride.to}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2"><strong>Seats:</strong> {ride.seats}</p>
              <p className="mb-4"><strong>Price:</strong> €{ride.price}</p>
              <Link href={`/rides/${ride.id}`}>
                <Button className="w-full">Book Ride</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}