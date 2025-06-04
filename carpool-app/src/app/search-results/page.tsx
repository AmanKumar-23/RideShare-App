'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CalendarIcon, ChevronLeftIcon, MapPinIcon, UserIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface Ride {
  id: string;
  driver: {
    name: string;
    rating: number;
    image: string;
  };
  departure: {
    location: string;
    time: string;
  };
  arrival: {
    location: string;
    time: string;
  };
  price: number;
  seats: number;
}

export default function SearchResults() {
  const searchParams = useSearchParams();
  const pickup = searchParams.get('pickup');
  const drop = searchParams.get('drop');
  const date = searchParams.get('date');
  
  const [rides, setRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState(true);

  // Format date as dd/mm/yyyy
  const formatDate = (dateString: string | null): string => {
    if (!dateString) return 'Today';
    try {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    } catch (e) {
      return 'Today';
    }
  };

  useEffect(() => {
    const fetchRides = async () => {
      try {
        setLoading(true);
        const params: any = {};
        if (pickup) params.from = pickup;
        if (drop) params.to = drop;
        if (date) params.date = date;
        // Add status parameter to only fetch scheduled rides
        params.status = 'scheduled';
        
        const response = await fetch(`/api/rides?${new URLSearchParams(params)}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch rides');
        }
        
        const fetchedRides = await response.json();
        
        // Transform the data to match the UI format
        const formattedRides = fetchedRides.map((ride: any) => ({
          id: ride._id,
          driver: {
            name: ride.driver?.name || 'Unknown Driver',
            rating: ride.driver?.rating || 4.5,
            image: ride.driver?.avatar || '/images/avatar1.png',
          },
          departure: {
            location: ride.from,
            time: ride.departureTime,
          },
          arrival: {
            location: ride.to,
            time: '', // Calculate arrival time if needed
          },
          price: ride.price,
          seats: ride.seats,
        }));
        
        setRides(formattedRides);
      } catch (error) {
        console.error('Error fetching rides:', error);
        setRides([]);
      } finally {
        setLoading(false);
      }
    };
  
    if (pickup && drop) {
      fetchRides();
    } else {
      setLoading(false);
    }
}, [pickup, drop, date]);

  return (
    <main className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-white p-3 flex items-center border-b border-gray-200">
        <Link href="/" className="mr-4">
          <ChevronLeftIcon className="h-5 w-5" />
        </Link>
        <h1 className="text-lg font-semibold">{pickup} → {drop}</h1>
      </header>

      {/* Search filters */}
      <div className="bg-white p-3 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center">
          <CalendarIcon className="h-4 w-4 mr-1 text-gray-500" />
          <span className="text-sm">{formatDate(date)}</span>
        </div>
        <button className="text-sm text-purple-500">Filters</button>
      </div>

      {/* Results */}
      <div className="p-3">
        {loading ? (
          <div className="flex justify-center p-10">
            <div className="animate-spin h-8 w-8 border-4 border-purple-500 border-t-transparent rounded-full"></div>
          </div>
        ) : rides.length === 0 ? (
          <div className="bg-white rounded-lg p-6 text-center">
            <p className="text-lg font-semibold mb-2">No rides found</p>
            <p className="text-sm text-gray-600 mb-4">Try different locations or date</p>
            <Link href="/" className="bg-purple-500 text-white rounded-full py-2 px-4 text-sm inline-block">
              Back to search
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {rides.map((ride) => (
              <div key={ride.id} className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden mr-3">
                      {ride.driver.image ? (
                        <Image
                          src={ride.driver.image}
                          alt={ride.driver.name}
                          width={40}
                          height={40}
                        />
                      ) : (
                        <UserIcon className="h-6 w-6 m-2 text-gray-500" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{ride.driver.name}</p>
                      <div className="flex items-center">
                        <span className="text-yellow-500">★</span>
                        <span className="text-xs ml-1">{ride.driver.rating}</span>
                      </div>
                    </div>
                  </div>
                  <span className="font-bold text-lg">₹{ride.price}</span>
                </div>
                
                <div className="flex">
                  <div className="w-8 flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                    <div className="w-0.5 h-14 bg-gray-300"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                  </div>
                  <div className="flex-1">
                    <div className="mb-4">
                      <p className="text-xs text-gray-500">{ride.departure.time}</p>
                      <p className="font-medium">{ride.departure.location}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">{ride.arrival.time}</p>
                      <p className="font-medium">{ride.arrival.location}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
                  <div className="flex items-center">
                    <UserIcon className="h-4 w-4 text-gray-500 mr-1" />
                    <span className="text-xs text-gray-500">{ride.seats} seats available</span>
                  </div>
                  <button className="bg-teal-500 text-white rounded-full py-1.5 px-4 text-sm">
                    Book now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}