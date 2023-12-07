import { part1, part2 } from ".";

jest.mock("../../utils", () => ({
  ...jest.requireActual("../../utils"),
  readByLine: jest.fn((file_name) => {
    return [];
  }),
}));

const data = ["32T3K 765", "T55J5 684", "KK677 28", "KTJJT 220", "QQQJA 483"];

describe("Test example", () => {
  it("Part 1", () => {
    expect(part1(data)).toEqual(6440);
  });

  it("Part 2", () => {
    expect(part2(data)).toEqual(5905);
  });
});
