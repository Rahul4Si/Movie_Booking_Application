/**
 * Utility functions for date formatting and manipulation
 */


/**
 * Format date from ISO string (e.g., "2025-10-18T19:21:00.000+00:00")
 * @param {string} isoDateString - ISO date string
 * @returns {object} Formatted date object
 */
export const formatDateFromISO = (isoDateString) => {
  const date = new Date(isoDateString);
  
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  
  const fullMonthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  return {
    day: date.getDate(),
    month: monthNames[date.getMonth()],
    monthString: monthNames[date.getMonth()], 
    fullMonth: fullMonthNames[date.getMonth()],
    year: date.getFullYear(),
    monthNumber: date.getMonth() + 1, // 1-based month number
    formattedDate: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`,
    originalDate: isoDateString
  };
};


/**
 * Transform array of ISO date strings to DateSelect component format
 * @param {string[]} isoDateArray - Array of ISO date strings
 * @returns {object[]} Array of formatted date objects with id
 */
export const transformDatesForDateSelect = (isoDateArray) => {
  return isoDateArray.map((isoDate, index) => ({
    id: index,
    ...formatDateFromISO(isoDate)
  }));
};


/**
 * Get display text for a date (e.g., "Today", "Tomorrow", or formatted date)
 * @param {string} isoDateString - ISO date string
 * @returns {string} Display text
 */
export const getDateDisplayText = (isoDateString) => {
  const date = new Date(isoDateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  // Reset time for comparison
  const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const tomorrowOnly = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate());
  
  if (dateOnly.getTime() === todayOnly.getTime()) {
    return "Today";
  } else if (dateOnly.getTime() === tomorrowOnly.getTime()) {
    return "Tomorrow";
  } else {
    return formatDateFromISO(isoDateString).formattedDate;
  }
};


/**
 * Check if a date is in the past
 * @param {string} isoDateString - ISO date string
 * @returns {boolean} True if date is in the past
 */
export const isDateInPast = (isoDateString) => {
  const date = new Date(isoDateString);
  const today = new Date();
  
  // Reset time for comparison
  const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  
  return dateOnly.getTime() < todayOnly.getTime();
};