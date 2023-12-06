import { readByLine, sumArray } from "../../utils";

type Cubes = {
  red: number;
  green: number;
  blue: number;
};

const parseLine = (line: string): Cubes[] => {
  return line
    .split(": ")[1]
    .split("; ")
    .map((line) => {
      const colors = line.split(", ");
      const cubes: Cubes = {
        red: 0,
        green: 0,
        blue: 0,
      };
      colors.forEach((color) => {
        const [amount, colorName] = color.split(" ");
        cubes[colorName as keyof Cubes] = parseInt(amount);
      });
      return cubes;
    });
};

export const part1 = (data: string[]) => {
  const games = data.map((line) => parseLine(line));
  let sum = 0;
  for (const [idx, cubes] of games.entries()) {
    if (
      cubes.every(
        (cube) => cube.red <= 12 && cube.green <= 13 && cube.blue <= 14
      )
    ) {
      sum += idx + 1;
    }
  }
  return sum;
};

export const part2 = (data: string[]) => {
  const games = data.map((line) => parseLine(line));
  const powers: number[] = games.map((game) => {
    let red = 0,
      green = 0,
      blue = 0;
    game.forEach((cube) => {
      red = Math.max(red, cube.red);
      green = Math.max(green, cube.green);
      blue = Math.max(blue, cube.blue);
    });
    return red * green * blue;
  });
  return sumArray(powers);
};

// ** Change file path *
const data = readByLine("../2023/day02/data");
// Do not run if empty file or test mock readFileSync
console.log(">>> Part 1:", part1(data));
console.log(">>> Part 2:", part2(data));
