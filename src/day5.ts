/**
 * Day 5 - Supply stacks - https://adventofcode.com/2022/day/5
 */

import { cloneArr, getInputData, toNum } from './utils.js';

interface Step {
  move: string;
  from: string;
  to: string;
}

enum State {
  LOADING_CRATES = 0,
  LOADING_STEPS = 1,
}
const SEPARATING_CHAR = '';
const EMPTY_CHAR = '0';

abstract class Crane {
  name: string;
  steps: Step[];
  supplies: string[][];

  constructor(name: string, steps: Step[], supplies: string[][]) {
    this.name = name;
    this.steps = cloneArr(steps);
    this.supplies = cloneArr(supplies);
  }
  abstract rearrangement: () => void;

  getSuppliesChars = (): string =>
    this.supplies.map((supply) => supply[0]).join('');
}

class CraneMover9000 extends Crane {
  rearrangement = (): void => {
    this.steps.forEach((step) => {
      for (let i = 0; i < toNum(step.move); i++) {
        this.supplies[toNum(step.to) - 1].unshift(
          this.supplies[toNum(step.from) - 1][0],
        );
        this.supplies[toNum(step.from) - 1].shift();
      }
    });
  };
}

class CraneMover9001 extends Crane {
  rearrangement = (): void => {
    this.steps.forEach((step) => {
      this.supplies[toNum(step.to) - 1] = [
        ...this.supplies[toNum(step.from) - 1].slice(0, toNum(step.move)),
        ...this.supplies[toNum(step.to) - 1],
      ];
      this.supplies[toNum(step.from) - 1] = this.supplies[
        toNum(step.from) - 1
      ].slice(toNum(step.move));
    });
  };
}

class SupplyStacks {
  cranes: Crane[] = [];
  supplies: string[][] = [];
  steps: Step[] = [];
  state: State = State.LOADING_CRATES;

  constructor() {
    this.getCrateSymbolsFromTopOfEachStack();
  }

  private getCrateSymbolsFromTopOfEachStack(): void {
    this.getMetadata();
    this.cranes.push(new CraneMover9000('9000', this.steps, this.supplies));
    this.cranes.push(new CraneMover9001('9001', this.steps, this.supplies));
    this.cranes.forEach((crane) => {
      crane.rearrangement();
      console.log(
        `After the rearrangement procedure completes with ${crane.name}, what crate ends up on top of each stack?`,
        crane.getSuppliesChars(),
      );
    });
  }

  private getMetadata = (): void => {
    const metadata: string[][] = [[], []];
    const rows = getInputData<string>('./src/day5-input.txt');

    for (let i = 0; i < rows.length; i++) {
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
  };

  private processStepsMetadata = (arr: string[]): void => {
    const steps: Step[] = [];
    for (let i = 0; i < arr.length; i++) {
      const [move, from, to] = arr[i].match(/\b([01]?[0-9][0-9]?)/g);
      steps.push({
        move,
        from,
        to,
      });
    }
    this.steps = steps;
  };
}

export default SupplyStacks;
