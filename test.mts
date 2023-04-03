/* eslint-env: node */

import { equal } from "node:assert/strict";
import { isWorkZoneAwarenessMonth, isWorkZoneAwarenessWeek } from "./index.js";

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

function* testItems(datesToTest: Date[]) {
  for (const d of datesToTest) {
    yield {
      date: d,
      "Formatted date": d.toLocaleDateString(undefined, {
        dateStyle: "full",
      }),
      "month test": isWorkZoneAwarenessMonth(d),
      "week test": isWorkZoneAwarenessWeek(d),
    };
  }
}

const tests = testItems(nwzaw2023Dates);

console.table([...tests]);

for (const date of nwzaw2023Dates) {
  equal(
    isWorkZoneAwarenessMonth(date),
    true,
    `${date.toLocaleDateString()} should be detected as being in National Work Zone Awareness Month`
  );
  equal(
    isWorkZoneAwarenessWeek(date),
    true,
    `${date.toLocaleDateString()} should be detected as being in National Work Zone Awareness Week`
  );
}
