import { readByLine } from "../../utils";

const parseData = (data: string[]) => {
  // ** To be changed *
  return data.join("; ");
};

export const part1 = (data: string[]) => {
  if (data.length === 0) {
    return 0;
  }
  const parsedData = parseData(data);
  console.log(parsedData);

  // ** To be changed *
  const res = parsedData;
  return res;
};

export const part2 = (data: string[]) => {
  if (data.length === 0) {
    return 0;
  }
  const parsedData = parseData(data);
  console.log(parsedData);

  // ** To be changed *
  const res = parsedData;
  return res;
};

// ** Change file path *
const data = readByLine("./template/data");
// Do not run if empty file or test mock readFileSync
console.log(">>> Part 1:", part1(data));
console.log(">>> Part 2:", part2(data));
