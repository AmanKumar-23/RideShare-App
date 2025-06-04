'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ridesAPI } from '@/services/api';
import PageLayout from '@/components/shared/PageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { MapPinIcon, CalendarIcon, UsersIcon, CarIcon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function PublishRidePage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: '',
    departureTime: '',
    seats: 1,
    price: 0,
    carDetails: {
      model: '',
      color: '',
      plateNumber: ''
    }
  });

  const validateForm = () => {
    if (!formData.from || !formData.to) {
      toast.error('Please enter both pickup and destination locations');
      return false;
    }

    if (formData.from.toLowerCase() === formData.to.toLowerCase()) {
      toast.error('Pickup and destination locations cannot be the same');
      return false;
    }

    if (!formData.date || !formData.departureTime) {
      toast.error('Please select both date and time');
      return false;
    }

    const now = new Date();
    const selectedDate = new Date(`${formData.date}T${formData.departureTime}`);
    
    if (selectedDate < now) {
      toast.error('Please select a future date and time');
      return false;
    }

    if (formData.seats < 1 || formData.seats > 8) {
      toast.error('Please enter a valid number of seats (1-8)');
      return false;
    }

    if (formData.price < 100) {
      toast.error('Price must be at least ₹100');
      return false;
    }

    if (!formData.carDetails.model || !formData.carDetails.color || !formData.carDetails.plateNumber) {
      toast.error('Please fill in all vehicle details');
      return false;
    }

    const plateNumberRegex = /^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$/;
    if (!plateNumberRegex.test(formData.carDetails.plateNumber)) {
      toast.error('Please enter a valid license plate number (e.g., MH01AB1234)');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!user) {
      toast.error('Please login to publish a ride');
      router.push('/login');
      return;
    }
  
    if (!validateForm()) {
      return;
    }
  
    try {
      setIsSubmitting(true);
  
      const selectedDate = new Date(`${formData.date}T${formData.departureTime}`);
  
      const rideData = {
        from: formData.from,
        to: formData.to,
        date: selectedDate.toISOString(),
        departureTime: formData.departureTime,
        seats: formData.seats,
        price: formData.price,
        carDetails: formData.carDetails,
        status: 'scheduled'
      };
  
      console.log('📦 Final ride payload:', rideData);
      console.log('📦 Token in localStorage:', localStorage.getItem('token'));
  
      const response = await ridesAPI.createRide(rideData);
      console.log('✅ Ride created:', response);
  
      toast.success('Ride published successfully!');
      router.push('/rides');
    } catch (error: any) {
      console.error('❌ Publish error:', error);
  
      let errorMessage = 'Failed to publish ride. Please try again.';
      if (error.response) {
        if (error.response.status === 401) {
          errorMessage = 'Unauthorized. Please log in again.';
          localStorage.removeItem('token');
          router.push('/login');
        } else if (error.response.status === 400) {
          errorMessage = error.response.data?.message || 'Invalid ride data.';
        } else if (error.response.status === 500) {
          errorMessage = 'Server error. Please try again later.';
        }
      }
  
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Remove the useEffect authentication check completely
  // and rely only on the check in handleSubmit

  // If still loading auth state, show loading indicator
  if (authLoading) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin h-8 w-8 border-4 border-purple-500 border-t-transparent rounded-full"></div>
        </div>
      </PageLayout>
    );
  }

  // If not authenticated, don't render the form
  if (!user) {
    return null;
  }

  return (
    <PageLayout>
      <div className="bg-gradient-to-r from-purple-900 to-indigo-900">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-2 text-white">Publish a Ride</h1>
          <p className="text-gray-300">Share your journey and help others travel affordably</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Route Section */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-purple-300 flex items-center gap-2">
                <MapPinIcon className="h-5 w-5" />
                Route Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">From</label>
                  <Input
                    type="text"
                    placeholder="Enter pickup city"
                    value={formData.from}
                    onChange={(e) => setFormData({...formData, from: e.target.value})}
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                    required
                    disabled={isSubmitting || authLoading}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">To</label>
                  <Input
                    type="text"
                    placeholder="Enter destination city"
                    value={formData.to}
                    onChange={(e) => setFormData({...formData, to: e.target.value})}
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                    required
                    disabled={isSubmitting || authLoading}
                  />
                </div>
              </div>
            </div>

            {/* Schedule Section */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-purple-300 flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Schedule
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Date</label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="bg-gray-800 border-gray-700 text-white"
                    required
                    disabled={isSubmitting || authLoading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Departure Time</label>
                  <Input
                    type="time"
                    value={formData.departureTime}
                    onChange={(e) => setFormData({...formData, departureTime: e.target.value})}
                    className="bg-gray-800 border-gray-700 text-white"
                    required
                    disabled={isSubmitting || authLoading}
                  />
                </div>
              </div>
            </div>

            {/* Ride Details Section */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-purple-300 flex items-center gap-2">
                <UsersIcon className="h-5 w-5" />
                Ride Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Available Seats</label>
                  <Input
                    type="number"
                    min="1"
                    max="8"
                    value={formData.seats}
                    onChange={(e) => setFormData({...formData, seats: parseInt(e.target.value)})}
                    className="bg-gray-800 border-gray-700 text-white"
                    required
                    disabled={isSubmitting || authLoading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Price per Seat (₹)</label>
                  <Input
                    type="number"
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData({
                      ...formData, 
                      price: Number(e.target.value) || 0  // Ensure we always get a number
                    })}
                    className="bg-gray-800 border-gray-700 text-white"
                    required
                    disabled={isSubmitting || authLoading}
                  />
                </div>
              </div>
            </div>

            {/* Vehicle Details Section */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-purple-300 flex items-center gap-2">
                <CarIcon className="h-5 w-5" />
                Vehicle Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Car Model</label>
                  <Input
                    type="text"
                    placeholder="e.g. Honda City"
                    value={formData.carDetails.model}
                    onChange={(e) => setFormData({
                      ...formData, 
                      carDetails: {...formData.carDetails, model: e.target.value}
                    })}
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                    required
                    disabled={isSubmitting || authLoading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Car Color</label>
                  <Input
                    type="text"
                    placeholder="e.g. White"
                    value={formData.carDetails.color}
                    onChange={(e) => setFormData({
                      ...formData, 
                      carDetails: {...formData.carDetails, color: e.target.value}
                    })}
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                    required
                    disabled={isSubmitting || authLoading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">License Plate</label>
                  <Input
                    type="text"
                    placeholder="e.g. MH01AB1234"
                    value={formData.carDetails.plateNumber}
                    onChange={(e) => setFormData({
                      ...formData, 
                      carDetails: {...formData.carDetails, plateNumber: e.target.value}
                    })}
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                    required
                    disabled={isSubmitting || authLoading}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-6 border-t border-gray-800">
              <Button 
                type="submit" 
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-2 rounded-full font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting || authLoading}
              >
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Publishing...
                  </>
                ) : 'Publish Ride'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </PageLayout>
  );
}

