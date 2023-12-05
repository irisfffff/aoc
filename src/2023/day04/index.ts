import { readByLine, sumArray } from "../../utils";
type Card = {
  winningNumbers: number[];
  myNumbers: number[];
  matches: number;
};

const getNumbers = (str: string) => {
  return str
    .split(" ")
    .filter((i) => Boolean(i))
    .map((n) => parseInt(n));
};

const getMatches = (winningNumbers: number[], myNumbers: number[]) => {
  return myNumbers.filter((n) => winningNumbers.includes(n)).length;
};

const parseData = (data: string[]) => {
  const cards: Card[] = [];
  data.forEach((line) => {
    const [sw, sm] = line.split(":")[1].split("|");
    const winningNumbers = getNumbers(sw);
    const myNumbers = getNumbers(sm);
    cards.push({
      winningNumbers,
      myNumbers,
      matches: getMatches(winningNumbers, myNumbers),
    });
  });
  return cards;
};

const getCardPoint = ({ matches }: Card) => {
  return matches ? Math.pow(2, matches - 1) : 0;
};

export const part1 = (data: string[]) => {
  if (data.length === 0) {
    return 0;
  }
  const cards = parseData(data);
  const points = cards.map(getCardPoint);

  const res = sumArray(points);
  return res;
};

export const part2 = (data: string[]) => {
  if (data.length === 0) {
    return 0;
  }
  const cards = parseData(data);
  const copies = Array(cards.length).fill(1);
  cards.forEach(({ matches }, i) => {
    for (let j = 1; j <= matches; j++) {
      copies[i + j] += copies[i];
    }
  });

  const res = sumArray(copies);
  return res;
};

// ** Change file path *
const data = readByLine("./day04/data");
// Do not run if empty file or test mock readFileSync
console.log(">>> Part 1:", part1(data));
console.log(">>> Part 2:", part2(data));
