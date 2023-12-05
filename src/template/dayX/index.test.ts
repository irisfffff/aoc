import { part1, part2 } from ".";

jest.mock("../../utils", () => ({
  ...jest.requireActual("../../utils"),
  readByLine: jest.fn((file_name) => {
    return [];
  }),
}));

const data = ["correct answer"];

describe("Test example", () => {
  it.skip("Part 1", () => {
    expect(part1(data)).toEqual("Answer 1");
  });

  it.skip("Part 2", () => {
    expect(part2(data)).toEqual("Answer 2");
  });
});
