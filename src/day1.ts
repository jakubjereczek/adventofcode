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

const getProvidedData = () => {
  try {
    const data = fs.readFileSync(
      path.resolve(__dirname, './src/day1-input.txt'),
      'utf8',
    );
    const arr = data.split(/\r?\n/);

    return arr;
  } catch (e) {
    console.log('Error:', e.stack);
  }
};

const calculateElfCalories = () => {
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

export const howManyCaloriesTheTopElvesCarrying = () => {
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
