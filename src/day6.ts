/**
 * Day 6 - Tuning trouble - https://adventofcode.com/2022/day/6
 */
import { getInputData } from './utils.js';

const onlyUnique = (value, index, self): boolean =>
  self.indexOf(value) === index;

const findXUnique = (arr: string[], length: number): number => {
  let returnedIndex = 0;
  const lastChars: string[] = [];
  arr.forEach((currentChar, index) => {
    if (lastChars.length === length) {
      lastChars.shift();
    }
    lastChars.push(currentChar);
    if (lastChars.filter(onlyUnique).length === length && returnedIndex === 0) {
      returnedIndex = index + 1;
    }
  });
  return returnedIndex;
};

export const processSignals = (): void => {
  const data = getInputData<string>('./src/day6-input.txt');

  console.log(data.map((signal) => findXUnique(signal.split(''), 4)));
  console.log(data.map((signal) => findXUnique(signal.split(''), 14)));
};
