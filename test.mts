/* eslint-env: node */

import { equal } from "node:assert/strict";
import {
  isWorkZoneAwarenessMonth,
  isWorkZoneAwarenessWeek,
  defaultWorkZoneAwarenessMonth,
  getWeekOfTheMonth,
  defaultWorkZoneAwarenessWeek
} from "./index.js";

/**
 * Enumerates through a range of numbers from {@link start} to {@link end}, inclusively.
 * @param start - Start value
 * @param end - End value
 * @param step - Increment value
 */
function* getAllNumbersInRange(start: number, end: number, step = 1) {
  for (let index = start; index <= end; index += step) {
    yield index;
  }
}

/**
 * These are all of the dates that are in NWZAW.
 */
const nwzaw2023Dates = [...getAllNumbersInRange(17, 21)].map(
  (d) => new Date(2023, 4 - 1, d)
);

const failDates = [
  new Date(2023, 1 - 1, 1),
  new Date(2023, 4 - 1, 1),
  new Date(2023, 4 - 1, 4),
  new Date(2023, 3 - 1, 21),
]

interface TestResult {
  date: Date;
  formattedDate: string;
  monthResult: boolean;
  weekResult: boolean;
  monthExpected: boolean;
  weekExpected: boolean;
}

function* testItems(
  datesToTest: Iterable<Date>
): Generator<TestResult, void, unknown> {
  for (const currentTestDate of datesToTest) {
    const monthExpected = currentTestDate.getMonth() === defaultWorkZoneAwarenessMonth - 1;
    const weekExpected = monthExpected && getWeekOfTheMonth(currentTestDate) === defaultWorkZoneAwarenessWeek;
    yield {
      date: currentTestDate,
      formattedDate: currentTestDate.toLocaleDateString("en-US", {
        dateStyle: "full",
      }),
      monthResult: isWorkZoneAwarenessMonth(currentTestDate),
      weekResult: isWorkZoneAwarenessWeek(currentTestDate),
      monthExpected,
      weekExpected,
    };
  }
}

const testResults = testItems(nwzaw2023Dates.concat(...failDates));

// Write out to console as a table.
console.table(
  [...testResults],
  [
    "formattedDate",
    "monthResult",
    "weekResult",
    "monthExpected",
    "weekExpected",
  ]
);

for (const {
  // date,
  formattedDate,
  monthResult,
  weekResult,
  weekExpected,
  monthExpected,
} of testResults) {
  equal(
    monthResult,
    monthExpected,
    `${formattedDate} should be detected as being in National Work Zone Awareness Month`
  );
  equal(
    weekResult,
    weekExpected,
    `${formattedDate} should be detected as being in National Work Zone Awareness Week`
  );
}
