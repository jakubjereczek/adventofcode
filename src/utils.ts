import fs from 'fs';
import path from 'path';
const __dirname = path.resolve();

export const getInputData = <TItem>(source: string): TItem[] => {
  try {
    const data = fs.readFileSync(path.resolve(__dirname, source), 'utf8');
    const arr = data.split(/\r?\n/);

    return arr as TItem[];
  } catch (e) {
    console.log('Error:', e.stack);
    return [];
  }
};
