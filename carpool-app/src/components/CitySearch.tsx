'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MapPinIcon } from 'lucide-react';

interface CitySearchProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onSelect: (city: string) => void;
  className?: string;
  id?: string;
}

// List of Indian cities and metros
const INDIAN_CITIES = [
  'Delhi', 'Mumbai', 'Bengaluru', 'Chennai', 'Hyderabad', 
  'Kolkata', 'Pune', 'Jaipur', 'Surat', 'Ahmedabad', 
  'Lucknow', 'Bhopal', 'Chandigarh', 'Indore', 'Noida', 
  'Gurugram', 'Kanpur', 'Patna', 'Kochi', 'Coimbatore',
  'Nagpur', 'Thiruvananthapuram', 'Visakhapatnam', 'Bhubaneswar',
  'Vadodara', 'Agra', 'Varanasi', 'Amritsar', 'Mysuru', 'Udaipur'
];

const CitySearch: React.FC<CitySearchProps> = ({
  placeholder,
  value,
  onChange,
  onSelect,
  className = '',
  id
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionRef = useRef<HTMLDivElement>(null);

  // Filter cities based on input
  useEffect(() => {
    if (value.trim() === '') {
      setFilteredCities([]);
      return;
    }
    
    const filtered = INDIAN_CITIES.filter(city => 
      city.toLowerCase().includes(value.toLowerCase())
    ).slice(0, 5); // Limit to 5 suggestions for better UX
    
    setFilteredCities(filtered);
  }, [value]);

  // Close suggestions on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current && 
        !inputRef.current.contains(event.target as Node) &&
        suggestionRef.current && 
        !suggestionRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (city: string) => {
    onChange(city);
    onSelect(city);
    setShowSuggestions(false);
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
        <input
          ref={inputRef}
          id={id}
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(true)}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-100"
        />
      </div>
      
      {showSuggestions && filteredCities.length > 0 && (
        <div 
          ref={suggestionRef}
          className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
        >
          {filteredCities.map((city, index) => (
            <div
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
              onClick={() => handleSuggestionClick(city)}
            >
              <MapPinIcon className="h-4 w-4 mr-2 text-gray-500" />
              <span>{city}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CitySearch; 