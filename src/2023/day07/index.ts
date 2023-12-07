import { readByLine, sumArray } from "../../utils";

const cardMap = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11,
  T: 10,
  "9": 9,
  "8": 8,
  "7": 7,
  "6": 6,
  "5": 5,
  "4": 4,
  "3": 3,
  "2": 2,
};
type Card = keyof typeof cardMap;

const shapeMap = {
  fiveOfAKind: 7,
  fourOfAKind: 6,
  fullHouse: 5,
  threeOfAKind: 4,
  twoPair: 3,
  onePair: 2,
  highCard: 1,
};
type Shape = keyof typeof shapeMap;

const getShape = (cards: Card[]) => {
  // Sort high to low
  const sortedCards = cards
    .slice(0)
    .sort((a, b) => cardMap[b] - cardMap[a]);
  if (sortedCards[0] === sortedCards[4]) {
    return "fiveOfAKind";
  }
  if (sortedCards[0] === sortedCards[3] || sortedCards[1] === sortedCards[4]) {
    return "fourOfAKind";
  }
  if (
    (sortedCards[0] === sortedCards[2] && sortedCards[3] === sortedCards[4]) ||
    (sortedCards[0] === sortedCards[1] && sortedCards[2] === sortedCards[4])
  ) {
    return "fullHouse";
  }
  if (
    sortedCards[0] === sortedCards[2] ||
    sortedCards[1] === sortedCards[3] ||
    sortedCards[2] === sortedCards[4]
  ) {
    return "threeOfAKind";
  }
  if (
    (sortedCards[0] === sortedCards[1] && sortedCards[2] === sortedCards[3]) ||
    (sortedCards[0] === sortedCards[1] && sortedCards[3] === sortedCards[4]) ||
    (sortedCards[1] === sortedCards[2] && sortedCards[3] === sortedCards[4])
  ) {
    return "twoPair";
  }
  if (
    sortedCards[0] === sortedCards[1] ||
    sortedCards[1] === sortedCards[2] ||
    sortedCards[2] === sortedCards[3] ||
    sortedCards[3] === sortedCards[4]
  ) {
    return "onePair";
  }

  return "highCard";
};

type Hand = {
  shape: Shape;
  cards: Card[];
  bid: number;
};

const parseData = (data: string[], getShape: (cards: Card[]) => Shape) => {
  const hands: Hand[] = [];
  data.forEach((line) => {
    const [cardsStr, bid] = line.split(" ");
    const cards = cardsStr.split("") as Card[];
    const shape = getShape(cards);
    hands.push({ cards, shape, bid: Number(bid) });
  });
  return hands;
};

const rankHands = (hands: Hand[], cardMap: Record<Card, number>) => {
  const sortedHands = hands.sort((a, b) => {
    if (a.shape === b.shape) {
      for (let i = 0; i < 5; i++) {
        if (cardMap[a.cards[i]] !== cardMap[b.cards[i]]) {
          return cardMap[a.cards[i]] - cardMap[b.cards[i]];
        }
      }
      return 0;
    }
    return shapeMap[a.shape] - shapeMap[b.shape];
  });
  return sortedHands;
};

export const part1 = (data: string[]) => {
  if (data.length === 0) {
    return 0;
  }
  const hands = parseData(data, getShape);
  const rankedHands = rankHands(hands, cardMap);

  const res = rankedHands.map((hand, i) => hand.bid * (i + 1));
  return sumArray(res);
};

const cardMapWithJoker: Record<Card, number> = {
  A: 14,
  K: 13,
  Q: 12,
  T: 10,
  "9": 9,
  "8": 8,
  "7": 7,
  "6": 6,
  "5": 5,
  "4": 4,
  "3": 3,
  "2": 2,
  J: 1,
};

const getShapeWithJoker = (cards: Card[]) => {
  // Sort high to low
  const sortedCards = cards
    .slice(0)
    .sort((a, b) => cardMapWithJoker[b] - cardMapWithJoker[a]);
  if (sortedCards[0] === sortedCards[4]) {
    return "fiveOfAKind";
  }
  if (sortedCards[0] === sortedCards[3] || sortedCards[1] === sortedCards[4]) {
    if (sortedCards[4] === "J") {
      return "fiveOfAKind";
    }
    return "fourOfAKind";
  }
  if (
    (sortedCards[0] === sortedCards[2] && sortedCards[3] === sortedCards[4]) ||
    (sortedCards[0] === sortedCards[1] && sortedCards[2] === sortedCards[4])
  ) {
    if (sortedCards[4] === "J") {
      return "fiveOfAKind";
    }
    return "fullHouse";
  }
  if (
    sortedCards[0] === sortedCards[2] ||
    sortedCards[1] === sortedCards[3] ||
    sortedCards[2] === sortedCards[4]
  ) {
    if (sortedCards[4] === "J") {
      return "fourOfAKind";
    }
    return "threeOfAKind";
  }
  if (sortedCards[0] === sortedCards[1] && sortedCards[2] === sortedCards[3]) {
    if (sortedCards[4] === "J") {
      return "fullHouse";
    }
    return "twoPair";
  }
  if (
    (sortedCards[0] === sortedCards[1] && sortedCards[3] === sortedCards[4]) ||
    (sortedCards[1] === sortedCards[2] && sortedCards[3] === sortedCards[4])
  ) {
    if (sortedCards[4] === "J") {
      return "fourOfAKind";
    }
    return "twoPair";
  }
  if (
    sortedCards[0] === sortedCards[1] ||
    sortedCards[1] === sortedCards[2] ||
    sortedCards[2] === sortedCards[3] ||
    sortedCards[3] === sortedCards[4]
  ) {
    if (sortedCards[4] === "J") {
      return "threeOfAKind";
    }
    return "onePair";
  }

  if (sortedCards[4] === "J") {
    return "onePair";
  }
  return "highCard";
};

export const part2 = (data: string[]) => {
  if (data.length === 0) {
    return 0;
  }
  const hands = parseData(data, getShapeWithJoker);
  const rankedHands = rankHands(hands, cardMapWithJoker);

  const res = rankedHands.map((hand, i) => hand.bid * (i + 1));
  return sumArray(res);
};

// ** Change file path *
const data = readByLine("../2023/day07/data");
console.log(">>> Part 1:", part1(data));
console.log(">>> Part 2:", part2(data));
