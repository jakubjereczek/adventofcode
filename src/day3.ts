/**
 * Day 3 - Rucksack order - https://adventofcode.com/2022/day/3
 */

import { getInputData } from './utils.js';

const alphabet = 'abcdefghijklmnopqrstuvwxyz';
const priorityOrder = `${alphabet}${alphabet.toUpperCase()}`.split('');

const getItemPriority = (letter: string): number =>
  priorityOrder.indexOf(letter) + 1;

const skipDuplicates = (arr: string[]): string[] => [...new Set(arr)];

const slice = (
  str: string,
): {
  left: string[];
  right: string[];
} => ({
  left: str.slice(0, str.length / 2).split(''),
  right: str.slice(str.length / 2).split(''),
});

const getRepeatedLetters = (
  a: string[],
  b: string[],
  c?: string[],
): string[] => {
  const letters: string[] = [];
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < b.length; j++) {
      if (c) {
        for (let k = 0; k < c.length; k++) {
          if (a[i] === b[j] && b[j] === c[k]) {
            letters.push(a[i]);
          }
        }
      } else {
        if (a[i] === b[j]) {
          letters.push(a[i]);
        }
      }
    }
  }
  return letters;
};

const sumItemsPriorities = (letters: string[]): number =>
  letters.reduce((acc, letter) => acc + getItemPriority(letter), 0);

export const getRucksackItemsSumPriorities = (): void => {
  const rucksack = getInputData<string>('./src/day3-input.txt');
  const elfBadgesSlicedLetters = [];
  for (let i = 0; i < rucksack.length; i++) {
    const { left, right } = slice(rucksack[i]);
    elfBadgesSlicedLetters.push(
      ...skipDuplicates(getRepeatedLetters(left, right)),
    );
  }
  console.log(
    'What is the sum of the priorities of those item types?',
    sumItemsPriorities(elfBadgesSlicedLetters),
  );

  const threeElfGroupLetters = [];
  for (let i = 0; i < rucksack.length; i += 3) {
    threeElfGroupLetters.push(
      ...skipDuplicates(
        getRepeatedLetters(
          rucksack[i].split(''),
          rucksack[i + 1].split(''),
          rucksack[i + 2].split(''),
        ),
      ),
    );
  }

  console.log(
    'What is the sum of the priorities of badges of each three-Elf group?',
    sumItemsPriorities(threeElfGroupLetters),
  );
};
