import { readByLine, sumArray, quickSortRecursive } from "../../utils";

const parseData1 = (data: string[]) => {
  return data.map((line) => {
    const numbers = line.replace(/[a-zA-Z]/g, "");
    return parseInt(numbers[0]) * 10 + parseInt(numbers[numbers.length - 1]);
  })
};

const numMap = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
};
const numStrings = Object.keys(numMap)


const getFirstNumAndReturnRestStr = (str: string) => {
  let idx = 0, len = 3;
  while (idx <= str.length - len) {
    const substr = str.substring(idx, idx + len);
    const potential = numStrings.find((numStr) => numStr.substring(0, len) === substr);
    if (potential) {
      const realLen = potential.length;
      if(str.substring(idx, idx + realLen) === potential) {
        // Reusing the last char of the number. E.g. "eightwothree" -> "823"
        return [numMap[potential as keyof typeof numMap], str.slice(idx + realLen - 1)];
      } else {
        idx++;
      }
    } else {
      idx++;
    }
  }
}

const parseData2 = (data: string[]) => {
  return data.map((line) => {
    // All chars before first number (if any) and first number (if any)
    const [, ss, sd] = line.match(/^(\D*)(\d?)/) as RegExpMatchArray;
    // All chars after last number (if any) and last number (if any)
    const [, ed, es] = line.match(/(\d?)(\D*)$/) as RegExpMatchArray;
    const sm = getFirstNumAndReturnRestStr(ss);
    const a = sm ? sm[0] : sd;
    let b = ed, leftStr = es;
    while (leftStr) {
      const em = getFirstNumAndReturnRestStr(leftStr);
      if (em) {
        b = em[0];
        leftStr = em[1];
      } else {
        break;
      }
    }
    const res = parseInt(a) * 10 + parseInt(b);
    return res;
  })
};

export const part1 = (data: string[]) => {
  const vals = parseData1(data);
  return sumArray(vals);
};

export const part2 = (data: string[]) => {
  const vals = parseData2(data);
  return sumArray(vals);
};

// Outputs answer, do not change
const data = readByLine("./day01/data");
console.log(part1(data));
console.log(part2(data));
