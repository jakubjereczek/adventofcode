import { getInputData } from './utils.js';

/*
  The following implementation is not a requirement, but my own attempt at creating a recursion parser.

  - / (dir)
    - a (dir)
      - e (dir)
        - i (file, size=584)
      - f (file, size=29116)
      - g (file, size=2557)
      - h.lst (file, size=62596)
    - b.txt (file, size=14848514)
    - c.dat (file, size=8504156)
    - d (dir)
      - j (file, size=4060174)
      - d.log (file, size=8033020)
      - d.ext (file, size=5626152)
      - k (file, size=7214296)

    to 

    [{
      name: '/',
      directories: [{
        name: 'a',
        directories: [...]
      },
      {
        name: 'b.txt', 
        size: 14848514,
      },
      {
        name: 'c.dat', 
        size: 8504156,
      },
      {
        name: 'd', 
        directories: [...],
      }]
    }]
*/


interface Directory {
  name: string;
  directories?: Directory[];
  size?: number;
}

const extractFileSize = (str: string): number => {
  return Number(str.slice(str.indexOf('size=') + 5, str.length - 1));
};

const getDepthLevel = (directorySource: string): number => {
  return Number(
    directorySource.slice(0, directorySource.indexOf('-')).length / 2,
  );
};

const getFirstLowerDepthLevelIndex = (
  currentDepthLevel: number,
  startFrom: number,
  dirSources: string[],
): number | undefined => {
  let searchedIndex;
  if (currentDepthLevel > 1) {
    dirSources.forEach((dirSource, index) => {
      if (
        !searchedIndex &&
        getDepthLevel(dirSource) === currentDepthLevel - 1 &&
        index > startFrom
      ) {
        searchedIndex = index;
      }
    });
  }
  return searchedIndex;
};

const parseInput = (
  currentDirectoryResult: Directory[],
  depthLevel: number,
  directorySource: string[],
): Directory[] => {
  return directorySource.flatMap((dirSource, index) => {
    const dirSourceDepthLevel = getDepthLevel(dirSource);
    if (dirSourceDepthLevel === depthLevel) {
      return {
        name: dirSource.trim().split(' ')[1],
        ...(dirSource.includes('dir') && {
          directories: parseInput(
            currentDirectoryResult,
            depthLevel + 1,
            directorySource.slice(
              Number(index + 1),
              getFirstLowerDepthLevelIndex(
                depthLevel + 1,
                Number(index + 1),
                directorySource,
              ),
            ),
          ),
        }),
        ...(dirSource.includes('file') && {
          size: extractFileSize(dirSource),
        }),
      };
    }
    return [];
  });
};



const calcDirectoriesSizeDeeply = (directories: Directory[]) => {
  let totalSize = 0;
  directories.forEach(directory => {
    if (directory.directories) {
      totalSize += calcDirectoriesSizeDeeply(directory.directories);
    } 
    if (directory.size) {
      totalSize += directory.size;
    }
  })
  return totalSize;
}

export const calcDirectoriesTotalSize = () => {
  console.log(parseInput(
    [],
    0,
    getInputData<string>('./src/day7-input.txt')
  )[0])
  const directory: Directory[] = parseInput(
    [],
    0,
    getInputData<string>('./src/day7-input.txt'),
  );
  console.log(calcDirectoriesSizeDeeply(directory));
};
