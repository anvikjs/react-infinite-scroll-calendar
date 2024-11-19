import {
  addMonths,
  compareAsc,
  differenceInMonths,
  endOfDay,
  format,
  getDaysInMonth,
  isValid,
  subMonths,
} from "date-fns";

export const getCurrentDate = () => {
  return endOfDay(new Date());
};
// help in month to render

export const getMonthDifference = (startDate: Date, endDate: Date) => {
  return differenceInMonths(endDate, startDate);
};

export const getDisplayDateFormat = (
  date: Date,
  formatToDisplay = "yyyy-MM-dd"
) => {
  return format(date, formatToDisplay);
};

export const addMonthInDate = (date: Date, noOfMonth: number) => {
  return addMonths(date, noOfMonth);
};

export const subMonthInDate = (date: Date, noOfMonth: number) => {
  return subMonths(date, noOfMonth);
};
export const getNoOfDaysInMonth = (date: Date) => {
  return getDaysInMonth(date);
};

export const isSameDate = (date1: Date, date2: Date) => {
  return endOfDay(date1).valueOf() === endOfDay(date2).valueOf();
};

export const compareDate = (date1: Date, date2: Date) => {
  /**
   * Compare the two dates
   * return 1 if the first date is after the second,
   * return -1 if the first date is before the second
   * return  0 if dates are equal.
   */
  return compareAsc(endOfDay(date1), endOfDay(date2));
};

export const dateIsInBetween = (date: Date, startDate: Date, endDate: Date) => {
  const start = Date.parse(String(endOfDay(startDate)));
  const end = Date.parse(String(endOfDay(endDate)));
  const d = Date.parse(String(endOfDay(date)));

  return d >= start && d <= end;
};

export const checkIsValidDate = (date: string | Date) => {
  return isValid(date);
};
export const isValidDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
};
// export const getMonthDifference = (minDate: Date, maxDate: Date) => {
//   let diff = Math.floor(minDate.getTime() - maxDate.getTime());
//   let day = 1000 * 60 * 60 * 24 * 7 * 4;
//   let monthDiff = Math.floor(diff / day);
//   return Math.abs(Math.round(monthDiff));
// };
