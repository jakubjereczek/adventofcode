/**
 * Day 1 - Calorie Counting
 */

import fs from 'fs';
import path from 'path';
const __dirname = path.resolve();

const DELIMITER = '';

type ElfToCaloriesDictionary = {
  [elf: string]: number;
};

/**
 * Returns a Array<string> that imports necessary data 
 *
 * @returns {Array<string>}
 */
const getProvidedData = (): Array<string> => {
  try {
    const data = fs.readFileSync(
      path.resolve(__dirname, './src/day1-input.txt'),
      'utf8',
    );
    const arr = data.split(/\r?\n/);

    return arr;
  } catch (e) {
    console.log('Error:', e.stack);
    return [];
  }
};

/**
 * Returns a ElfToCaloriesDictionary that contains the elf calories dictionary 
 * [elfId: string]: number
 * 
 * @returns {ElfToCaloriesDictionary}
 */
const calculateElfCalories = (): ElfToCaloriesDictionary => {
  const elvesFoodCalories = getProvidedData();
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
 * Returns a void. Displays the desired final data in the console.
 * 
 * @returns {void}
 */
export const howManyCaloriesTheTopElvesCarrying = (): void => {
  const elfCaloriesDictionary = calculateElfCalories();

  const sortedCaloriesArray = Object.entries(elfCaloriesDictionary).sort(
    ([, a], [, b]) => b - a,
  );

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
