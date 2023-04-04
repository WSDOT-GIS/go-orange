/**
 * A one-based integer number representing a month.
 * Unlike JavaScript date object which uses 0-based numbering for months
 * (but not dates or years), this type uses 1-based numbering to
 * match what people actually use.
 */
export type Month = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

/**
 * Zero-based integer number representing the week of a month.
 */
export type WeekOfMonth = 0 | 1 | 2 | 3 | 4 | 5;

/**
 * A mapping of the days of the week to their
 * numeric value as returned by {@link Date.prototype.getDay()}
 */
export const daysOfTheWeekMap = new Map(
  [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ].map((value, index) => [index, value])
);

/**
 * Gets the week of the month.
 * Based on code from
 * ["How to get the week of the month with JavaScript?" by John Au-Yeung, 2022-01-17](https://thewebdev.info/2022/01/17/how-to-get-the-week-of-the-month-with-javascript/)
 * @param inputDate - The input date. Defaults to today (`new Date()`) if omitted.
 */
export function getWeekOfTheMonth(inputDate: Date = new Date()) {
  // "We use the getDate and getDay methods
  // to get the day of the month and the
  // day of the week respectively."
  const dayOfTheMonth = inputDate.getDate();
  const dayOfTheWeek = inputDate.getDay();
  // "Then we use Math.ceil((date - 1 - day) / 7) to get
  // the week of the month by subtracting the date
  // from 1 + day divided by 7."
  const weekOfTheMonth = Math.ceil((dayOfTheMonth - 1 - dayOfTheWeek) / 7);
  return weekOfTheMonth;
}

/**
 * Default Work Zone Awareness Month.
 */
export const defaultWorkZoneAwarenessMonth: Month = 4;

/**
 * Default Work Zone Awareness Week.
 */
export const defaultWorkZoneAwarenessWeek: WeekOfMonth = 3;

/**
 * Determine if a given date is either a Saturday or a Sunday.
 * @param date - Date to test.
 * @returns True if input date is a Saturday or a Sunday, false otherwise.
 */
export function isWeekend(date: Date) {
  const weekendDays = [0, 6];
  const dayOfWeek = date.getDay();
  return weekendDays.includes(dayOfWeek);
}

/**
 * Determines if a date falls within National Work Zone Awareness Week (NWZAW).
 * @param inputDate - The date to be checked.
 * @param wzaMonth - Specify Work Zone Awareness Month to override default.
 * Unlike JavaScript date object which uses 0-based numbering for months
 * (but not dates or years), this function uses 1-based numbering to
 * match what people actually use.
 * @param wzaWeek - Specify which week of {@link wzaMonth} is NWZAW to override default.
 * @param omitWeekends - Specify whether Saturday and Sunday are counted as part of NWZAW.
 * @returns A boolean indicating if it is indeed Work Zone awareness week.
 */
export function isWorkZoneAwarenessWeek(
  inputDate: Date,
  wzaMonth: Month = defaultWorkZoneAwarenessMonth,
  wzaWeek = defaultWorkZoneAwarenessWeek,
  omitWeekends = true
) {
  if (omitWeekends && isWeekend(inputDate)) {
    return false;
  }
  const isNWZAM = isWorkZoneAwarenessMonth(inputDate, wzaMonth);
  if (!isNWZAM) {
    return false;
  }
  const weekOfMonth = getWeekOfTheMonth(inputDate);
  const isNWZAW = weekOfMonth === wzaWeek;
  return isNWZAW;
}

/**
 * Determines if a date falls within Work Zone Awareness Month.
 * @param inputDate - The date to be checked.
 * @param wzaMonth - Specify Work Zone Awareness Month to override default.
 * Unlike JavaScript date object which uses 0-based numbering for months
 * (but not dates or years), this function uses 1-based numbering to
 * match what people actually use.
 * @returns A boolean indicating if it is indeed Work Zone Awareness Month.
 */
export function isWorkZoneAwarenessMonth(
  inputDate: Date,
  wzaMonth: Month = defaultWorkZoneAwarenessMonth
) {
  const inputMonth = inputDate.getMonth() + 1;
  return inputMonth === wzaMonth;
}

export default isWorkZoneAwarenessWeek;
