'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';

interface LocationSearchProps {
  placeholder: string;
  onPlaceSelect: (place: any) => void;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  icon?: React.ReactNode;
}

const LocationSearch = ({
  placeholder,
  onPlaceSelect,
  value,
  onChange,
  className = '',
  icon
}: LocationSearchProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    // Load Google Maps Places API script if not already loaded
    if (!window.google?.maps?.places) {
      const googleMapsScript = document.createElement('script');
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
      
      if (!apiKey) {
        setLoadError('Google Maps API key is missing');
        return;
      }
      
      googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      googleMapsScript.async = true;
      googleMapsScript.defer = true;
      window.document.body.appendChild(googleMapsScript);

      googleMapsScript.onload = () => {
        setIsLoaded(true);
        setLoadError(null);
      };
      
      googleMapsScript.onerror = () => {
        setLoadError('Failed to load Google Maps API');
      };

      return () => {
        if (googleMapsScript.parentNode) {
          window.document.body.removeChild(googleMapsScript);
        }
      };
    } else {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded || !inputRef.current) return;

    // Initialize Google Places Autocomplete
    autocompleteRef.current = new google.maps.places.Autocomplete(inputRef.current, {
      types: ['geocode', 'establishment'],
      fields: ['address_components', 'geometry', 'name', 'formatted_address'],
    });

    // Add listener for place selection
    const listener = autocompleteRef.current.addListener('place_changed', () => {
      const place = autocompleteRef.current?.getPlace();
      if (place && place.formatted_address) {
        onChange(place.formatted_address);
        onPlaceSelect(place);
      }
    });

    return () => {
      if (google && google.maps && listener) {
        google.maps.event.removeListener(listener);
      }
    };
  }, [isLoaded, onPlaceSelect, onChange]);

  return (
    <div className={`relative ${className}`}>
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 pr-8 py-2 w-full bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
        disabled={!!loadError}
      />
      {loadError && (
        <div className="mt-1 text-red-500 text-xs">{loadError}</div>
      )}
      {icon && <div className="absolute right-3 top-1/2 transform -translate-y-1/2">{icon}</div>}
    </div>
  );
};

export default LocationSearch;