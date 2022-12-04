/**
 * Day 1 - Calorie Counting
 */

import { getInputData } from './utils.js';

const DELIMITER = '';

type ElfToCaloriesDictionary = {
  [elf: string]: number;
};

/**
 * Returns a ElfToCaloriesDictionary that contains the elf calories dictionary
 * [elfId: string]: number
 *
 * @returns {ElfToCaloriesDictionary}
 */
const calculateElfCalories = (): ElfToCaloriesDictionary => {
  const elvesFoodCalories = getInputData('./src/day1-input.txt');
  const elfToCaloriesDictionary: ElfToCaloriesDictionary = {};
  let currentElfIndex = 0;
  let currentElfCalories = 0;
  elvesFoodCalories.forEach((elfCalories, index) => {
    if (elfCalories !== DELIMITER) {
      currentElfCalories += Number(elfCalories);
    }
    if (elfCalories === DELIMITER || index === elvesFoodCalories.length - 1) {
      elfToCaloriesDictionary[currentElfIndex] = currentElfCalories;
      currentElfCalories = 0;
      currentElfIndex += 1;
    }
  });
  return elfToCaloriesDictionary;
};

/**
 * Returns a [string, number][]. A helper function to sort object entries and convert into array.
 *
 * @returns {[string, number][]}
 */
const sortObjectEntries = (source: {
  [key: string]: number;
}): [string, number][] => Object.entries(source).sort(([, a], [, b]) => b - a);

/**
 * Returns a void. Displays the desired final data in the console.
 *
 * @returns {void}
 */
export const howManyCaloriesTheTopElvesCarrying = (): void => {
  const elfCaloriesDictionary = calculateElfCalories();
  const sortedCaloriesArray = sortObjectEntries(elfCaloriesDictionary);

  console.log(
    'How many calories the top Elf carrying?',
    sortedCaloriesArray[0][1],
  );

  console.log(
    'How many calories top three Elves carrying? ',
    sortedCaloriesArray[0][1] +
      sortedCaloriesArray[1][1] +
      sortedCaloriesArray[2][1],
  );
};
