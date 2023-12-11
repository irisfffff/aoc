import { readByLine, sumArray } from "../../utils";

const parseData = (data: string[]) => {
  const regex = /(-?\d+)/g;
  return data.map((line) => {
    const match = line.match(regex);
    if (match) {
      return match.map((str) => parseInt(str));
    }
    // This should never happen
    return [];
  });
};

const getDifference = (values: number[]) => {
  const diffs = [];
  for (let i = 0; i < values.length - 1; i++) {
    diffs.push(values[i + 1] - values[i]);
  }
  return diffs;
};

const getNextValue = (values: number[]) => {
  let diffs = values.slice(0);
  const lastValues = [values[values.length - 1]];
  while (true) {
    diffs = getDifference(diffs);
    lastValues.push(diffs[diffs.length - 1]);
    if (diffs.every((i) => i === 0)) {
      break;
    }
  }
  return sumArray(lastValues);
};

export const part1 = (data: string[]) => {
  if (data.length === 0) {
    return 0;
  }
  const histories = parseData(data);

  const res = sumArray(histories.map(getNextValue));
  return res;
};

const getNewFirstValue = (values: number[]) => {
  let diffs = values.slice(0);
  const firstValues = [values[0]];
  while (true) {
    diffs = getDifference(diffs);
    firstValues.push(diffs[0]);
    if (diffs.every((i) => i === 0)) {
      break;
    }
  }
  let res = firstValues[firstValues.length - 1];
  for (let i = firstValues.length - 2; i >= 0; i--) {
    res = firstValues[i] - res;
  }
  return res
};

export const part2 = (data: string[]) => {
  if (data.length === 0) {
    return 0;
  }
  const histories = parseData(data);

  const res = sumArray(histories.map(getNewFirstValue));
  return res;
};

// ** Change file path *
const data = readByLine("../2023/day09/data");
console.log(">>> Part 1:", part1(data));
console.log(">>> Part 2:", part2(data));
