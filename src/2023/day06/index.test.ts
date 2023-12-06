import { part1, part2 } from ".";

jest.mock("../../utils", () => ({
  ...jest.requireActual("../../utils"),
  readByLine: jest.fn((file_name) => {
    return [];
  }),
}));

const data = ["Time:      7  15   30", "Distance:  9  40  200"];

describe("Test example", () => {
  it("Part 1", () => {
    expect(part1(data)).toEqual(288);
  });

  it("Part 2", () => {
    expect(part2(data)).toEqual(71503);
  });
});
