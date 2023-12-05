import { part1, part2 } from ".";

jest.mock("fs", () => ({
  readFileSync: jest.fn((file_name) => {
    return [];
  }),
}));

const data1 = ["1abc2", "pqr3stu8vwx", "a1b2c3d4e5f", "treb7uchet"];
const data2 = [
  "two1nine",
  "eightwothree",
  "abcone2threexyz",
  "xtwone3four",
  "4nineeightseven2",
  "zoneight234",
  "7pqrstsixteen",
];

describe("Day 1", () => {
  it("Part 1", () => {
    expect(part1(data1)).toBe(142);
  });

  it("Part 2", () => {
    expect(part2(data2)).toBe(281);
  });

});
