import { part1, part2 } from ".";

jest.mock("../../utils", () => ({
  ...jest.requireActual("../../utils"),
  readByLine: jest.fn((file_name) => {
    return [];
  }),
}));

const data = [
  "467..114..",
  "...*......",
  "..35..633.",
  "......#...",
  "617*......",
  ".....+.58.",
  "..592.....",
  "......755.",
  "...$.*....",
  ".664.598..",
];

describe("Test example", () => {
  it("Part 1", () => {
    expect(part1(data)).toEqual(4361);
  });

  it("Part 2", () => {
    expect(part2(data)).toEqual(467835);
  });
});
