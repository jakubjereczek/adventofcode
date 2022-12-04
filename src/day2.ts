/**
 * Day 2 - Rock, paper and scissors 
 */

import { getInputData } from './utils.js';

type ShortCut = 'X' | 'A' | 'Y' | 'B' | 'Z' | 'C';

enum Shape {
  Rock = 'rock', // X, A
  Paper = 'paper', // Y, B
  Scissors = 'scissors', // Z, C
}

type ShapeShortcut = {
  [key in Shape]: ShortCut[];
};

const shapeShortcuts: ShapeShortcut = {
  rock: ['X', 'A'],
  paper: ['Y', 'B'],
  scissors: ['Z', 'C'],
};

type ShapePoints = {
  [key in Shape]: number;
};

const shapePoints: ShapePoints = {
  rock: 1,
  paper: 2,
  scissors: 3,
};

enum Rewards {
  Lost = 0,
  Draw = 3,
  Won = 6,
}

const getShapeByShortCut = (shortCut: ShortCut): Shape => {
  let shape: Shape;

  Object.entries(shapeShortcuts).forEach(([key, shortCuts]) => {
    if (shortCuts.includes(shortCut)) {
      shape = key as Shape;
    }
  });
  return shape;
};

const getStrategyGuide = (): [ShortCut, ShortCut][] => {
  const strategyGuide = getInputData<string>('./src/day2-input.txt').map(
    (arr) => arr.split(' '),
  ) as [ShortCut, ShortCut][];

  return strategyGuide;
};

const calculateRockScissorsPaperPoints = (
  strategyGuide: [ShortCut, ShortCut][],
): number[] => {
  const totalPointsArray: number[] = [];

  strategyGuide.forEach(([enemyShortcut, myShortcut]) => {
    const enemyShape = getShapeByShortCut(enemyShortcut);
    const myShape = getShapeByShortCut(myShortcut);
    let rewardsPoints = 0;
    const currentShapePoints = shapePoints[myShape];

    if (myShape === enemyShape) {
      rewardsPoints = Rewards.Draw;
    } else if (myShape === Shape.Rock) {
      switch (enemyShape) {
        case Shape.Scissors:
          rewardsPoints = Rewards.Won;
          break;
        case Shape.Paper:
          rewardsPoints = Rewards.Lost;
          break;
      }
    } else if (myShape === Shape.Paper) {
      switch (enemyShape) {
        case Shape.Rock:
          rewardsPoints = Rewards.Won;
          break;
        case Shape.Scissors:
          rewardsPoints = Rewards.Lost;
          break;
      }
    } else if (myShape === Shape.Scissors) {
      switch (enemyShape) {
        case Shape.Paper:
          rewardsPoints = Rewards.Won;
          break;
        case Shape.Rock:
          rewardsPoints = Rewards.Lost;
          break;
      }
    }

    totalPointsArray.push(rewardsPoints + currentShapePoints);
  });

  return totalPointsArray;
};


// second part
const getShapeShortcut = (key: Shape): ShortCut => {
  return shapeShortcuts[key][0];
}

const replaceOwnShortcutToMockResults = (shortCuts: [ShortCut, ShortCut][]): [ShortCut, ShortCut][] => {
  return shortCuts.map(shortCut => {
    if (shortCut[1] === 'X') { // X means you need to lose - rock
      if (shortCut[0] === 'A') { // rock
        return [shortCut[0], getShapeShortcut(Shape.Scissors)];
      }else if (shortCut[0] === 'B') { // paper 
        return [shortCut[0], getShapeShortcut(Shape.Rock)];
      } else { // scissors 
        return [shortCut[0], getShapeShortcut(Shape.Paper)];
      }
    }else if (shortCut[1] === 'Y') { // Y means you need to end the round in a draw - paper
        return [shortCut[0], shortCut[0]];
    } else { // Z means you need to win - scissors
      if (shortCut[0] === 'A') {
        return [shortCut[0], getShapeShortcut(Shape.Paper)]; // rock
      }else if (shortCut[0] === 'B') {
        return [shortCut[0], getShapeShortcut(Shape.Scissors)]; // paper
      } else {
        return [shortCut[0], getShapeShortcut(Shape.Rock)]; // scissors
      }
    }
  })
  
};

export const getRockScissorsPaperPoints = (): void => {
  const strategyGuide = getStrategyGuide();
  const points = calculateRockScissorsPaperPoints(strategyGuide);
  const totalPoints = points.reduce((acc, points) => acc + points, 0);
  console.log('Total Rock-Scissors-Paper game points', totalPoints);

  const mockedStrategyGuide = replaceOwnShortcutToMockResults(strategyGuide);
  const mockedPoints = calculateRockScissorsPaperPoints(mockedStrategyGuide);
  const mockedTotalPoints = mockedPoints.reduce((acc, points) => acc + points, 0);
  console.log('Total Rock-Scissors-Paper game points with mocked strategy guide', mockedTotalPoints)
};
