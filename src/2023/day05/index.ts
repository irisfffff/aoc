import { readByLine } from "../../utils";
type ResourceMap = {
  ds: number;
  ss: number;
  len: number;
};

type Resource = {
  destination: string;
  map: ResourceMap[];
};

type ResourceRange = {
  start: number;
  len: number;
};

const parseData = (data: string[]) => {
  const seedRegx = /\d+/g;
  const seeds = data[0].match(seedRegx)?.map(Number) || [];
  const resources: Record<string, Resource> = {};
  const resourceRegx = /^(\w+)-to-(\w+) map:$/;
  let currentResourceName = "",
    currentDestinationName = "",
    currentMap: ResourceMap[] = [];
  for (let i = 2; i < data.length; i++) {
    if (!data[i]) {
      resources[currentResourceName] = {
        destination: currentDestinationName,
        map: currentMap.sort((a, b) => a.ss - b.ss),
      };
      currentResourceName = "";
      currentMap = [];
      continue;
    }
    if (!currentResourceName) {
      const [, from, to] = data[i].match(resourceRegx) as RegExpMatchArray;
      currentResourceName = from;
      currentDestinationName = to;
    } else {
      const [ds, ss, len] = data[i].split(" ").map(Number);
      currentMap.push({ ds, ss, len });
    }
  }
  // Deal with last value
  if (currentResourceName) {
    resources[currentResourceName] = {
      destination: currentDestinationName,
      map: currentMap.sort((a, b) => a.ss - b.ss),
    };
  }
  return {
    seeds,
    resources,
  };
};

const findLocationForSeed = (
  resources: Record<string, Resource>,
  seed: number
): number => {
  let currentResourceName = "seed",
    num = seed;
  while (currentResourceName !== "location") {
    const resource = resources[currentResourceName];
    const { destination, map } = resource;
    const findMap = map.find((m) => m.ss <= num && num <= m.ss + m.len - 1);
    if (findMap) {
      const { ds, ss } = findMap;
      currentResourceName = destination;
      num = ds + (num - ss);
    } // Otherwise num stays the same
    currentResourceName = destination;
  }
  return num;
};

export const part1 = (data: string[]) => {
  if (data.length === 0) {
    return 0;
  }
  const { seeds, resources } = parseData(data);
  const locations = seeds.map((seed) => findLocationForSeed(resources, seed));

  const res = Math.min(...locations);
  return res;
};

const sortRanges = (ranges: ResourceRange[]) => {
  return ranges.sort((a, b) => a.start - b.start);
};

const mergeRanges = (ranges: ResourceRange[]) => {
  if (ranges.length <= 1) return ranges;
  const res: ResourceRange[] = [];
  let currentRange = ranges.shift() as ResourceRange;
  while (ranges.length) {
    const nextRange = ranges.shift() as ResourceRange;
    if (currentRange.start + currentRange.len >= nextRange.start) {
      currentRange = {
        start: currentRange.start,
        len: nextRange.start + nextRange.len - currentRange.start,
      };
    } else {
      res.push(currentRange);
      currentRange = nextRange;
    }
  }
  if (currentRange) {
    res.push(currentRange);
  }
  return res;
};

const findLocationForRanges = (
  resources: Record<string, Resource>,
  seedRanges: ResourceRange[]
): ResourceRange[] => {
  let currentResourceName = "seed",
    ranges = sortRanges(seedRanges);
  while (currentResourceName !== "location") {
    let newRanges: ResourceRange[] = [];
    const { destination, map } = resources[currentResourceName];
    while (ranges.length) {
      const { start, len: rl } = ranges.shift() as ResourceRange;
      // Find the map that contains the start of the range
      const findStartMap = map.find(
        (m) => m.ss <= start && start <= m.ss + m.len - 1
      );
      if (findStartMap) {
        const { ds, ss, len } = findStartMap;
        if (ss + len >= start + rl) {
          // All included
          newRanges.push({
            start: ds + (start - ss),
            len: rl,
          });
        } else {
          // Not all included
          newRanges.push({
            start: ds + (start - ss),
            len: ss + len - start,
          });
          ranges.unshift({
            start: ss + len,
            len: start + rl - (ss + len),
          });
        }
      } else {
        // Find the lowest map that begins after the start of the range
        const findNextMap = map.find((m) => m.ss > start);
        if (findNextMap) {
          const { ds, ss, len } = findNextMap;
          if (ss >= start + rl) {
            // All direct map
            newRanges.push({
              start,
              len: rl,
            });
          } else {
            // Not all direct map
            newRanges.push({
              start,
              len: ss - start,
            });
            ranges.unshift({
              start: ss,
              len: start + rl - ss,
            });
          }
        } else {
          // No map found
          newRanges.push({
            start,
            len: rl,
          });
        }
      }
    }

    currentResourceName = destination;
    ranges = mergeRanges(sortRanges(newRanges));
  }
  return ranges;
};

export const part2 = (data: string[]) => {
  if (data.length === 0) {
    return 0;
  }
  const { seeds, resources } = parseData(data);
  const seedRanges: ResourceRange[] = [];
  for (let i = 0; i < seeds.length; i += 2) {
    seedRanges.push({
      start: seeds[i],
      len: seeds[i + 1],
    });
  }

  const res = findLocationForRanges(resources, seedRanges);
  return Math.min(...res.map((r) => r.start));
};

// ** Change file path *
const data = readByLine("./day05/data");
// Do not run if empty file or test mock readFileSync
console.log(">>> Part 1:", part1(data));
console.log(">>> Part 2:", part2(data));
