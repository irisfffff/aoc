import { readByLine, multiplyArray } from "../../utils";

type RaceRecord = {
  t: number;
  dis: number;
};

const parseData = (data: string[]) => {
  const times = data[0].match(/\d+/g)?.map(Number) || [];
  const distances = data[1].match(/\d+/g)?.map(Number) || [];
  const records: RaceRecord[] = [];
  for (let i = 0; i < times.length; i++) {
    records.push({ t: times[i], dis: distances[i] });
  }
  return records;
};

const parseData2 = (data: string[]): RaceRecord => {
  const time = data[0].match(/\d+/g)?.join("") || "0"
  const distance = data[1].match(/\d+/g)?.join("") || "0"
  return {
    t: parseInt(time),
    dis: parseInt(distance)
  };
};

// press: x, total t: t
// distance = x * (t - x) > dis
// xt - x^2 > dis
// x^2 - xt + dis < 0
// (x - t/2)^2 + dis - (t^2)/4 < 0
// -((t^2)/4 - dis)^(1/2) < x - t/2 < ((t^2)/4 - dis)^(1/2)
const getNumberOfWaysToBeatRecord = ({ t, dis }: RaceRecord) => {
  const r = Math.pow(t, 2) / 4 - dis
  if (r < 0) {
    throw new Error("Something is wrong")
  }
  const min = t/2 - Math.pow(r, 1/2)
  const minX = Math.ceil(min) === min ? min + 1 : Math.ceil(min)
  const max = t/2 + Math.pow(r, 1/2)
  const maxX = Math.floor(max) === max ? max - 1 : Math.floor(max)
  return maxX - minX + 1;
};

export const part1 = (data: string[]) => {
  if (data.length === 0) {
    return 0;
  }
  const records = parseData(data);

  const res = multiplyArray(records.map(getNumberOfWaysToBeatRecord));
  return res;
};

export const part2 = (data: string[]) => {
  if (data.length === 0) {
    return 0;
  }
  const record = parseData2(data);
  console.log(record);

  const res = getNumberOfWaysToBeatRecord(record);
  return res;
};

// ** Change file path *
const data = readByLine("../2023/day06/data");
console.log(">>> Part 1:", part1(data));
console.log(">>> Part 2:", part2(data));
