/**
 * Day 5 - Supply stacks - https://adventofcode.com/2022/day/5
 */

import { getInputData } from './utils.js';

interface Step {
  move: string;
  from: string;
  to: string;
}

enum State {
  INIT = -1,
  LOADING_CRATES = 0,
  LOADING_STEPS = 1,
}
const SEPARATING_CHAR = '';
const EMPTY_CHAR = '0';

class SupplyStacks {
  supplies: string[][] = [];
  steps: Step[] = [];
  state: State = State.INIT;

  constructor() {
    this.getCrateSymbolsFromTopOfEachStack();
  }

  private getCrateSymbolsFromTopOfEachStack(): void {
    this.getMetadata();
    this.rearrangement('CreateMover9000');
    this.rearrangement('CreateMover9001');
  }

  private getMetadata = (): void => {
    const metadata: string[][] = [[], []];
    const rows = getInputData<string>('./src/day5-input.txt');

    for (let i = 0; i < rows.length; i++) {
      if (i === 0) {
        this.state = State.LOADING_CRATES;
      }
      if (rows[i] === SEPARATING_CHAR) {
        this.state = State.LOADING_STEPS;
        continue;
      }
      metadata[this.state].push(rows[i]);
    }
    this.processCratesMetadata(metadata[0]);
    this.processStepsMetadata(metadata[1]);
  };

  private processCratesMetadata = (arr: string[]): void => {
    const horizontalRows: string[][] = [];
    for (let i = 0; i < arr.length - 1; i++) {
      const chars = arr[i].split('');
      const newRow = [];
      for (let j = 1; j < chars.length; j += 4) {
        newRow.push(chars[j] === ' ' ? EMPTY_CHAR : chars[j]);
      }
      horizontalRows.push(newRow);
    }

    const verticalRows: string[][] = Array.from({
      length: horizontalRows.length + 1,
    }).map(() => []);

    for (let i = 0; i < horizontalRows.length; i++) {
      for (let j = 0; j < horizontalRows[i].length; j++) {
        if (horizontalRows[i][j] === EMPTY_CHAR) {
          continue;
        }
        verticalRows[j].push(horizontalRows[i][j]);
      }
    }
    this.supplies = verticalRows;
    console.log(this.supplies);
  };

  private processStepsMetadata = (arr: string[]): void => {
    const steps: Step[] = [];
    for (let i = 0; i < arr.length; i++) {
      const regex = /\b([01]?[0-9][0-9]?)/g;
      const [move, from, to] = arr[i].match(regex);
      steps.push({
        move,
        from,
        to,
      });
    }
    this.steps = steps;
  };

  private rearrangement = (
    crane: 'CreateMover9000' | 'CreateMover9001',
  ): void => {
    const supplies = JSON.parse(JSON.stringify(this.supplies)); // a way to deep clone
    this.steps.forEach((step) => {
      if (crane === 'CreateMover9000') {
        for (let i = 0; i < Number(step.move); i++) {
          supplies[Number(step.to) - 1].unshift(
            supplies[Number(step.from) - 1][0],
          );
          supplies[Number(step.from) - 1].shift();
        }
      }
      if (crane === 'CreateMover9001') {
        supplies[Number(step.to) - 1] = [
          ...supplies[Number(step.from) -1].slice(0, Number(step.move)),
          ... supplies[Number(step.to) - 1] 
        ]
        supplies[Number(step.from) - 1] = supplies[Number(step.from) - 1].slice(Number(step.move))
      }
    });

    console.log(
      `After the rearrangement procedure completes with ${crane}, what crate ends up on top of each stack?`,
      this.getSuppliesChars(supplies),
    );
  };

  private getSuppliesChars = (supplies: string[][]): string => {
    let chars = '';
    supplies.forEach((arr) => {
      chars += arr[0];
    });
    return chars;
  };
}

export default SupplyStacks;
