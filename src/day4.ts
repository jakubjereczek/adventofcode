/**
 * Day 4 - Camp cleanup - https://adventofcode.com/2022/day/4
 */
import { getInputData } from './utils.js';

/**
 * Convert text with pattern above:
 * "X-Y,X-Y" -> [[X,Y], [X,Y]]
 */
const split = (input: string): string[][] => {
  const [firstSections, secondSections] = input.split(',');

  return [firstSections.split('-'), secondSections.split('-')];
};

const getBorders = (assignments: string[][]): string[] => {
  return [...assignments[0], ...assignments[1]];
}

const checkFullyContains = (assignments: string[][]): boolean => {
  const [X1, Y1, X2, Y2] = getBorders(assignments);
  if ((+X1 >= +X2 && +Y1 <= +Y2) || (+X2 >= +X1 && +Y2 <= +Y1)) {
    return true;
  }
  return false;
};

const checkOverlaps = (assignments: string[][]): boolean => {
  const [X1, Y1, X2, Y2] = getBorders(assignments);

  // for (let i = +X1; i <= +Y1; i++) {
  //   for (let j = +X2; j <= +Y2; j++) {
  //    if (i === j) {
  //     return true;
  //    }
  //   }
  // }

  if (Math.max(+X1, +X2) <= Math.min(+Y1, +Y2)) {
    return true;
  }
  
  return false;
};

/**
 * Calculate how many assignment pairs does one range fully contain the other.
 */
export const calculateAssignmentPairs = (): void => {
  let pairs = 0;
  const assignments = getInputData<string>('./src/day4-input.txt');

  assignments.forEach((row) => {
    const assignment = split(row);
    if (checkFullyContains(assignment)) {
      pairs += 1;
    }
  });
  console.log(
    'How many assignment pairs does one range fully contain the other?',
    pairs,
  );

  let overlapPairs = 0;
  assignments.forEach((row) => {
    const assignment = split(row);
    if (checkOverlaps(assignment)) {
      overlapPairs += 1;
    }
  });
  console.log(
    'In how many assignment pairs do the ranges overlap?',
    overlapPairs,
  );
};