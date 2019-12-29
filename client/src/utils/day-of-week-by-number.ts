const dayNames = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

/**
 * Converts number to the name of day of week
 * @param day the number of day of week
 * @example
 *  dayOfWeekByNumber(0) returns 'Sunday'
 *  dayOfWeekByNumber(1) returns 'Monday'
 *  // and so on ...
 *  dayOfWeekByNumber(7) returns 'Sunday'
 *  dayOfWeekByNumber(8) returns 'Monday'
 *  // and so on ...
 */
export const dayOfWeekByNumber = (day: number): string => {
  return dayNames[day % 7];
};
