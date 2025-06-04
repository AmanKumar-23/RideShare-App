'use client';

import React, { useState, useRef, useEffect } from 'react';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { format, addMonths, subMonths, isSameDay, isBefore, startOfDay } from 'date-fns';

interface DatePickerProps {
  selectedDate: Date | null;
  onChange: (date: Date) => void;
  className?: string;
  minDate?: Date;
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DatePicker: React.FC<DatePickerProps> = ({
  selectedDate,
  onChange,
  className = '',
  minDate = new Date()
}) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const datePickerRef = useRef<HTMLDivElement>(null);

  // Format date as dd/mm/yyyy
  const formatDate = (date: Date): string => {
    return format(date, 'dd/MM/yyyy');
  };

  // Get calendar grid for current month view
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    
    // First day of month
    const firstDay = new Date(year, month, 1);
    // Last day of month
    const lastDay = new Date(year, month + 1, 0);
    
    const daysArray = [];
    
    // Add empty cells for days before the first day of month
    for (let i = 0; i < firstDay.getDay(); i++) {
      daysArray.push(null);
    }
    
    // Add all days in month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      daysArray.push(new Date(year, month, i));
    }
    
    return daysArray;
  };

  // Check if date is today
  const isToday = (date: Date): boolean => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Check if date is selected
  const isSelected = (date: Date): boolean => {
    if (!selectedDate) return false;
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  // Check if date is in the past (before minDate)
  const isPastDate = (date: Date): boolean => {
    const compareDate = startOfDay(minDate);
    return isBefore(date, compareDate);
  };

  // Navigate to previous month
  const goToPreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  // Navigate to next month
  const goToNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  // Handle date selection
  const handleDateSelect = (date: Date) => {
    if (!isPastDate(date)) {
      onChange(date);
      setShowCalendar(false);
    }
  };

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={datePickerRef} className={`relative ${className}`}>
      <div 
        className="flex items-center justify-between bg-gray-100 border border-gray-300 rounded-lg p-2 cursor-pointer"
        onClick={() => setShowCalendar(!showCalendar)}
      >
        <div className="flex items-center">
          <CalendarIcon className="h-4 w-4 mr-2 text-gray-500" />
          <span className="text-sm">
            {selectedDate ? formatDate(selectedDate) : 'Select date'}
          </span>
        </div>
        <ChevronRightIcon className={`h-4 w-4 text-gray-500 transition-transform ${showCalendar ? 'rotate-90' : ''}`} />
      </div>

      {showCalendar && (
        <div className="absolute z-20 mt-1 p-3 bg-white rounded-lg shadow-lg border border-gray-200 w-64">
          {/* Month navigation */}
          <div className="flex justify-between items-center mb-2">
            <button 
              onClick={goToPreviousMonth} 
              className="p-1 hover:bg-gray-100 rounded"
              type="button"
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </button>
            <div className="font-medium">
              {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </div>
            <button 
              onClick={goToNextMonth} 
              className="p-1 hover:bg-gray-100 rounded"
              type="button"
            >
              <ChevronRightIcon className="h-4 w-4" />
            </button>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-1 mb-1">
            {DAYS.map(day => (
              <div key={day} className="text-center text-xs font-medium text-gray-500">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-1">
            {getDaysInMonth(currentMonth).map((date, index) => (
              <div 
                key={index} 
                className="text-center py-1"
              >
                {date ? (
                  <button
                    type="button"
                    onClick={() => handleDateSelect(date)}
                    disabled={isPastDate(date)}
                    className={`
                      w-8 h-8 rounded-full flex items-center justify-center text-sm
                      ${isSelected(date) ? 'bg-teal-500 text-white' : ''}
                      ${isToday(date) ? 'border border-teal-500' : ''}
                      ${isPastDate(date) ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-gray-100'}
                    `}
                  >
                    {date.getDate()}
                  </button>
                ) : (
                  <div className="w-8 h-8"></div>
                )}
              </div>
            ))}
          </div>
          
          {/* Quick selection buttons */}
          <div className="mt-2 pt-2 border-t border-gray-200 flex justify-between">
            <button 
              type="button"
              onClick={() => handleDateSelect(new Date())} 
              className="text-xs text-teal-600 hover:underline"
            >
              Today
            </button>
            <button 
              type="button"
              onClick={() => {
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                handleDateSelect(tomorrow);
              }} 
              className="text-xs text-teal-600 hover:underline"
            >
              Tomorrow
            </button>
            <button 
              type="button"
              onClick={() => {
                const nextWeek = new Date();
                nextWeek.setDate(nextWeek.getDate() + 7);
                handleDateSelect(nextWeek);
              }} 
              className="text-xs text-teal-600 hover:underline"
            >
              Next week
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;