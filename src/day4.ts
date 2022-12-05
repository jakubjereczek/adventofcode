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
  const [A, B, C, D] = getBorders(assignments);
  if ((+A >= +C && +B <= +D) || (+C >= +A && +D <= +B)) {
    return true;
  }
  return false;
};

const checkOverlaps = (assignments: string[][]): boolean => {
  const [A, B, C, D] = getBorders(assignments);

  for (let i = +A; i <= +B; i++) {
    for (let j = +C; j <= +D; j++) {
     if (i === j) {
      return true;
     }
    }
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