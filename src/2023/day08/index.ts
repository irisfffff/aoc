import { log } from "console";
import { readByLine, lcm } from "../../utils";

type Node = {
  left: string;
  right: string;
};

const parseData = (data: string[]) => {
  const instruction = data[0];
  const nodes: Record<string, Node> = {};
  data.slice(2).forEach((line) => {
    const rgx = /(\w+) = \((\w+), (\w+)\)/;
    const [, nodeName, left, right] = line.match(rgx) as RegExpMatchArray;
    nodes[nodeName] = { left, right };
  });
  return {
    instruction,
    nodes,
  };
};

const findNextNodeName = (
  nodes: Record<string, Node>,
  nodeName: string,
  direction: string
) => {
  return direction === "L" ? nodes[nodeName].left : nodes[nodeName].right;
};

const getSteps = (
  nodes: Record<string, Node>,
  instruction: string,
  start = "AAA",
  end = "ZZZ",
  stepsFrom = 0
) => {
  let nodeName = start,
    steps = stepsFrom;
  let visitedNodeAt: Record<string, number[]> = {};
  while (nodeName !== end) {
    const i = steps % instruction.length;
    if (visitedNodeAt[nodeName]?.includes(i)) {
      // log("Visited this node before at the same index! Loop detected!");
      return;
    } else {
      if (!visitedNodeAt[nodeName]) {
        visitedNodeAt[nodeName] = [i];
      } else {
        visitedNodeAt[nodeName].push(i);
      }
    }
    nodeName = findNextNodeName(nodes, nodeName, instruction[i]);
    steps++;
  }
  return steps;
};

export const part1 = (data: string[]) => {
  if (data.length === 0) {
    return 0;
  }
  const { instruction, nodes } = parseData(data);

  const res = getSteps(nodes, instruction);
  return res;
};

export const part20 = (data: string[]) => {
  if (data.length === 0) {
    return 0;
  }
  const { instruction, nodes } = parseData(data);
  const starts = Object.keys(nodes).filter((n) => n[2] === "A");
  // Brute force
  let steps = 0,
    nodeNames = starts;
  while (!nodeNames.every((n) => n[2] === "Z")) {
    nodeNames = nodeNames.map((n) =>
      findNextNodeName(nodes, n, instruction[steps % instruction.length])
    );
    steps++;
  }

  const res = steps;
  return res;
};

export const part2 = (data: string[]) => {
  if (data.length === 0) {
    return 0;
  }
  const { instruction, nodes } = parseData(data);
  const starts = Object.keys(nodes).filter((n) => n[2] === "A");
  const ends = Object.keys(nodes).filter((n) => n[2] === "Z");
  // NOTE: Each start node only corresponds to one end node
  const steps: number[] = [];
  starts.forEach((start, i) => {
    log("Start at:", start);
    ends.forEach((end) => {
      // log("End at:", end);
      const step = getSteps(nodes, instruction, start, end);
      if (step) {
        log("End at:", end);
        log("Steps", step);
        steps.push(step);
        log("Index from instruction", step % instruction.length)
        // NOTE: Index from instruction is always 0,
        // hence the step is the interval
      }
    });
  });

  const res = steps.reduce((acc, cur) => lcm(acc, cur), steps[0]);
  return res;
};

// ** Change file path *
const data = readByLine("../2023/day08/data");
console.log(">>> Part 1:", part1(data));
console.log(">>> Part 2:", part2(data));
