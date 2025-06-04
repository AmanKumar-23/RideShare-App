// src/app/rides/page.tsx
'use client';

import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PageLayout from "@/components/shared/PageLayout";
import { useSearchParams } from 'next/navigation';
import { CalendarIcon, MapPinIcon, UserIcon, ArrowRightIcon } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { ridesAPI } from '@/services/api';

interface Ride {
  id: number | string;
  from: string;
  to: string;
  date: string;
  departureTime: string;
  seats: number;
  price: number;
  driver: {
    name: string;
    rating: number;
    trips: number;
    avatar: string;
  };
  car: string;
}

export default function RidePage() {
  const searchParams = useSearchParams();
  const pickup = searchParams?.get('pickup') || '';
  const drop = searchParams?.get('drop') || '';
  const date = searchParams?.get('date') || '';
  const seats = searchParams?.get('seats') || '1';

  const { data: rides = [], isLoading, error } = useQuery({
    queryKey: ['rides', pickup, drop, date, seats], // Add seats to query key
    queryFn: async () => {
      try {
        if (!pickup || !drop || !date) {
          return [];
        }
  
        // Format the date to ensure it's in YYYY-MM-DD format
        // This prevents timezone issues when creating Date objects
        const formattedDate = date.split('T')[0]; // Extract just the date part if it has time
        
        const params: any = {
          from: pickup,
          to: drop,
          date: formattedDate,
          status: 'scheduled', // Only get scheduled rides
          seats: seats // Pass the seats parameter correctly
        };
        
        console.log('Searching with params:', params);
        const response = await ridesAPI.getAllRides(params);
        return response || [];
      } catch (error) {
        console.error('Error fetching rides:', error);
        throw error;
      }
    },
    // Only fetch if all params are provided
    enabled: Boolean(pickup && drop && date)
  });

  // Remove this line since we're already destructuring data as rides above
  // const rides = data || [];

  // Parse and format the date for display
  const formattedDate = date ? format(new Date(date), 'PPP') : 'Not specified';

  if (!pickup || !drop || !date) {
    return (
      <PageLayout>
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="bg-yellow-900/30 border border-yellow-800 rounded-lg p-4 mb-8">
            <h2 className="text-yellow-400 text-lg font-semibold mb-2">Missing search criteria</h2>
            <p className="text-gray-300">
              Please return to the homepage and provide both pickup and drop locations, as well as a travel date to find rides.
            </p>
            <Button 
              className="mt-4 bg-purple-600 hover:bg-purple-700"
              onClick={() => window.location.href = '/'}
            >
              Go to Search
            </Button>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Search summary */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-xl font-bold mb-4 text-gray-100">
                <span className="text-purple-400">{pickup}</span> to <span className="text-purple-400">{drop}</span>
              </h1>
              <div className="flex items-center text-gray-400 mb-2">
                <CalendarIcon className="h-4 w-4 mr-2" />
                <span>{formattedDate}</span>
              </div>
            </div>
            <Button 
              className="mt-4 md:mt-0 bg-purple-600 hover:bg-purple-700 flex items-center gap-2"
              onClick={() => window.location.href = '/'}
            >
              Modify Search
            </Button>
          </div>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-900 border border-gray-800 rounded-lg p-6 animate-pulse">
                <div className="flex justify-between">
                  <div className="space-y-2">
                    <div className="h-5 bg-gray-800 rounded w-32"></div>
                    <div className="h-4 bg-gray-800 rounded w-20"></div>
                  </div>
                  <div className="h-8 bg-gray-800 rounded w-16"></div>
                </div>
                <div className="mt-4 h-12 bg-gray-800 rounded"></div>
              </div>
            ))}
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="bg-red-900/30 border border-red-800 rounded-lg p-4">
            <h2 className="text-red-400 text-lg font-semibold mb-2">Error</h2>
            <p className="text-gray-300">
              There was a problem fetching rides. Please try again later.
            </p>
          </div>
        )}

        {/* Ride listings */}
        {!isLoading && !error && rides && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-purple-300">
              {rides.length > 0 ? 
                `${rides.length} Rides Available` : 
                'No rides found for this route'}
            </h2>
            
            <div className="space-y-4">
              {rides.map((ride: Ride) => (
                <Card key={ride.id} className="bg-gray-900 border border-gray-800 hover:border-purple-700 transition-all duration-300">
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row justify-between">
                      {/* Time and route */}
                      <div className="mb-4 md:mb-0">
                        <div className="flex items-baseline gap-2 mb-2">
                          <span className="text-xl font-bold text-white">{ride.departureTime}</span>
                          <span className="text-gray-400">• {ride.date}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col items-center">
                            <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                            <div className="h-10 w-0.5 bg-gray-700"></div>
                            <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                          </div>
                          <div className="space-y-2">
                            <div className="font-medium text-gray-200">{ride.from}</div>
                            <div className="font-medium text-gray-200">{ride.to}</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Price and booking */}
                      <div className="flex flex-col items-end">
                        <div className="text-2xl font-bold text-white mb-2">₹{ride.price}</div>
                        <div className="flex items-center text-gray-400 mb-4">
                          <UserIcon className="h-4 w-4 mr-1" />
                          <span>{ride.seats} seat{ride.seats !== 1 ? 's' : ''} left</span>
                        </div>
                        <Button className="bg-purple-600 hover:bg-purple-700">
                          Book Now <ArrowRightIcon className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                    
                    {/* Driver info */}
                    <div className="mt-6 pt-4 border-t border-gray-800 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-purple-700 rounded-full flex items-center justify-center text-white font-medium">
                          {ride.driver.name.split(' ')[0][0]}
                        </div>
                        <div>
                          <div className="font-medium text-gray-200">{ride.driver.name}</div>
                          <div className="text-sm text-gray-400">{ride.car}</div>
                        </div>
                      </div>
                      <div className="flex items-center text-yellow-500">
                        ★ {ride.driver.rating}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {rides.length === 0 && (
                <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 text-center">
                  <div className="text-4xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-200">No rides found</h3>
                  <p className="text-gray-400 mb-6">
                    We couldn't find any rides matching your search criteria. Try adjusting your search parameters.
                  </p>
                  <Button 
                    className="bg-purple-600 hover:bg-purple-700"
                    onClick={() => window.location.href = '/'}
                  >
                    Back to Search
                  </Button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </PageLayout>
  );
}