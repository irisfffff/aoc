import { readByLine, sumArray } from "../../utils";

type Pos = {
  row: number; // from 0
  start: number; // from 0 to length - 1
  end: number; // from 0 to length - 1
};
type Num = {
  value: number;
  pos: Pos;
};
type Symbol = {
  sign: string;
  row: number; // from 0
  col: number; // from 0
};

const parseData = (data: string[]) => {
  const regxSymbol = /[^\d\.]/;
  const regxNum = /\d+/g;

  const symbols: Symbol[] = [];
  const nums: Num[] = [];
  data.forEach((line, row) => {
    for (let i = 0; i < line.length; i++) {
      if (regxSymbol.test(line[i])) {
        symbols.push({ row, col: i, sign: line[i] });
      }
    }
    let match;
    while ((match = regxNum.exec(line)) !== null) {
      nums.push({
        value: parseInt(match[0]),
        pos: {
          row,
          start: match.index,
          end: match.index + match[0].length - 1,
        },
      });
    }
  });
  return { symbols, nums };
};

const isSymbolAround = (symbol: Symbol, num: Num) => {
  const { row, col } = symbol;
  const {
    pos: { row: rowN, start, end },
  } = num;
  if (row === rowN && (col === start - 1 || col === end + 1)) {
    return true;
  } else if (
    (row === rowN - 1 || row === rowN + 1) &&
    col >= start - 1 &&
    col <= end + 1
  ) {
    return true;
  }
  return false;
};

export const part1 = (data: string[]) => {
  if (data.length === 0) {
    return 0;
  }
  const { symbols, nums } = parseData(data);
  const partNums = nums.filter((num) => {
    return symbols.some((symbol) => {
      return isSymbolAround(symbol, num);
    });
  });

  const res = sumArray(partNums.map((num) => num.value));

  return res;
};

export const part2 = (data: string[]) => {
  if (data.length === 0) {
    return 0;
  }
  const { symbols, nums } = parseData(data);
  const stars = symbols.filter((symbol) => symbol.sign === "*");
  const gears: number[] = []
  stars.forEach((star) => {
    const neighborNums = nums.filter((num) => isSymbolAround(star, num));
    if (neighborNums.length === 2) {
      const [num1, num2] = neighborNums;
      gears.push(num1.value * num2.value);
    }
  })

  const res = sumArray(gears);

  return res;
};

// ** Change file path *
const data = readByLine("../2023/day03/data");
// Do not run if empty file or test mock readFileSync
console.log(">>> Part 1:", part1(data));
console.log(">>> Part 2:", part2(data));
