import { part1, part2 } from ".";

jest.mock("../../utils", () => ({
  ...jest.requireActual("../../utils"),
  readByLine: jest.fn((file_name) => {
    return [];
  }),
}));

const data = [
  "RL",
  "",
  "AAA = (BBB, CCC)",
  "BBB = (DDD, EEE)",
  "CCC = (ZZZ, GGG)",
  "DDD = (DDD, DDD)",
  "EEE = (EEE, EEE)",
  "GGG = (GGG, GGG)",
  "ZZZ = (ZZZ, ZZZ)",
];
const data2 = [
  "LLR",
  "",
  "AAA = (BBB, BBB)",
  "BBB = (AAA, ZZZ)",
  "ZZZ = (ZZZ, ZZZ)",
];

const data3 = [
  "LR",
  "",
  "11A = (11B, XXX)",
  "11B = (XXX, 11Z)",
  "11Z = (11B, XXX)",
  "22A = (22B, XXX)",
  "22B = (22C, 22C)",
  "22C = (22Z, 22Z)",
  "22Z = (22B, 22B)",
  "XXX = (XXX, XXX)",
];

describe("Test example", () => {
  it("Part 1", () => {
    expect(part1(data)).toEqual(2);
  });
  it("Part 1, test 2", () => {
    expect(part1(data2)).toEqual(6);
  });

  it("Part 2", () => {
    expect(part2(data3)).toEqual(6);
  });
});
