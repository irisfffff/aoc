import { part1, part2 } from ".";

jest.mock("../../utils", () => ({
  ...jest.requireActual("../../utils"),
  readByLine: jest.fn((file_name) => {
    return [];
  }),
}));

const data = ["0 3 6 9 12 15", "1 3 6 10 15 21", "10 13 16 21 30 45"];
const data2 = []

describe("Test example", () => {
  it("Part 1", () => {
    expect(part1(data)).toEqual(114);
  });

  it("Part 2", () => {
    expect(part2(data)).toEqual(2);
  });
});
