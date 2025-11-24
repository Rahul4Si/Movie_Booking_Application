import React, { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const DateSelect = ({ id, getMovieDetails, showId }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();
  const [dates, setDates] = useState(getMovieDetails.showDates);
  
  // Create unique dates based on date string (YYYY-MM-DD format)
  const uniqueDates = useMemo(() => {
    const dateMap = new Map();
    dates.forEach(dateItem => {
      // Create a date key for uniqueness check
      const dateKey = `${dateItem.year}-${String(dateItem.month).padStart(2, '0')}-${String(dateItem.day).padStart(2, '0')}`;
      
      // Only add if this date doesn't exist yet
      if (!dateMap.has(dateKey)) {
        dateMap.set(dateKey, dateItem);
      }
    });
    return Array.from(dateMap.values());
  }, [dates]);


  const handlePrevious = () => {
    // Logic for previous dates can be implemented here
    console.log("Previous dates");
  };


  const handleNext = () => {
    // Logic for next dates can be implemented here
    console.log("Next dates");
  };


  const handleDateSelect = (dateItem) => {
    setSelectedDate(dateItem);
  };


  const onBookHandler = () => {
    if (!selectedDate) {
      toast.error("No Date Selected. Please select a date.");
      return;
    }


    const formattedBookingDate = `${selectedDate.year}-${String(selectedDate.month).padStart(2, '0')}-${String(selectedDate.day).padStart(2, '0')}`;
    console.log(id, formattedBookingDate);
    navigate(`/movies/${showId}/${formattedBookingDate}`);
  };


  return (
    <div
      id={id}
      className="w-[95%] sm:w-[90%] lg:w-[80%] mx-auto mb-2 p-4 sm:p-6 lg:p-8 bg-gradient-to-r from-gray-800/90 via-gray-900/90 to-black/90 rounded-2xl backdrop-blur-sm border border-gray-700/50 shadow-2xl"
    >
      {/* Title */}
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 text-center sm:text-left">
        Choose Date
      </h2>


      {/* Mobile Layout - Stacked */}
      <div className="block sm:hidden space-y-6">
        {/* Date Selection */}
        <div className="flex items-center justify-center gap-2">
          {/* Previous button */}
          <button
            onClick={handlePrevious}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-300"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>


          {/* Date cards - Mobile */}
          <div className="flex gap-2">
            {uniqueDates.map((date) => (
              <button
                key={date.id}
                onClick={() => handleDateSelect(date)}
                className={`relative p-2 min-w-[70px] rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                  selectedDate?.id === date.id
                    ? "border-red-500 bg-red-500/20 text-white shadow-lg shadow-red-500/25"
                    : "border-gray-600 bg-gray-800/50 text-gray-300 hover:border-gray-500 hover:bg-gray-700/50"
                }`}
              >
                <div className="text-center">
                  <div className="text-lg font-bold">{date.day}</div>
                  <div className="text-xs text-gray-400 mt-1">{date.month}</div>
                </div>


                {/* Selected indicator */}
                {selectedDate?.id === date.id && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-gray-900"></div>
                )}
              </button>
            ))}
          </div>


          {/* Next button */}
          <button
            onClick={handleNext}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-300"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>


        {/* Book Now button - Mobile */}
        <div className="flex justify-center">
          <button
            onClick={onBookHandler}
            className="w-full max-w-[280px] px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold text-base rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-500/25 hover:shadow-red-500/40"
          >
            Book Now
          </button>
        </div>
      </div>


      {/* Desktop/Tablet Layout - Side by side */}
      <div className="hidden sm:flex items-center justify-between">
        {/* Left section with date navigation */}
        <div className="flex items-center gap-4 lg:gap-8">
          {/* Previous button */}
          <button
            onClick={handlePrevious}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>


          {/* Date cards - Desktop */}
          <div className="flex gap-3 lg:gap-4">
            {uniqueDates.map((date) => (
              <button
                key={date.id}
                onClick={() => handleDateSelect(date)}
                className={`relative p-3 min-w-[70px] lg:min-w-[80px] rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                  selectedDate?.id === date.id
                    ? "border-red-500 bg-red-500/20 text-white shadow-lg shadow-red-500/25"
                    : "border-gray-600 bg-gray-800/50 text-gray-300 hover:border-gray-500 hover:bg-gray-700/50"
                }`}
              >
                <div className="text-center">
                  <div className="text-xl lg:text-2xl font-bold">
                    {date.day}
                  </div>
                  <div className="text-sm text-gray-400 mt-1">
                    {date.monthString}
                  </div>
                </div>


                {/* Selected indicator */}
                {selectedDate?.id === date.id && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-gray-900"></div>
                )}
              </button>
            ))}
          </div>


          {/* Next button */}
          <button
            onClick={handleNext}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>


        {/* Book Now button - Desktop */}
        <button
          onClick={onBookHandler}
          className="px-6 lg:px-8 py-3 lg:py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold text-base lg:text-lg rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-500/25 hover:shadow-red-500/40"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};


export default DateSelect;
