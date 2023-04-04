# "Go Orange" detection

Determines if a date falls within [National Work Zone Awareness Week] (NWZAW).

[![Node.js CI](https://github.com/WSDOT-GIS/go-orange/actions/workflows/node.js.yml/badge.svg)](https://github.com/WSDOT-GIS/go-orange/actions/workflows/node.js.yml) [![npm](https://img.shields.io/npm/l/@wsdot/go-orange.svg?style=flat-square)](https://www.npmjs.org/package/@wsdot/go-orange) [![npm](https://img.shields.io/npm/v/@wsdot/go-orange.svg?style=flat-square)](https://www.npmjs.org/package/@wsdot/go-orange)

## Usage

### Installation

```console
npm install @wsdot/go-orange
```

### Use

```typescript
import {
  isWorkZoneAwarenessMonth,
  isWorkZoneAwarenessWeek,
} from "@wsdot/go-orange";

const today = new Date();
const isGoOrangeMonth = isWorkZoneAwarenessMonth(today);
const isNWZAWeek = isWorkZoneAwarenessWeek(today);

if (isGoOrangeMonth) {
  // Import the specific Go Orange CSS or whatever customizations you need to do.
  if (isNWZAWeek) {
    alert("It's National Work Zone Awareness Week!");
  }
}
```

[National Work Zone Awareness Week]: https://www.nwzaw.org
