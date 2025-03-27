type Difficulty = "easy" | "medium" | "difficult";
type Direction = [number, number];
type Grid = string[][];

export function generateWordSearch(words: string[], size: number, difficulty: Difficulty): Grid {
  const grid: Grid = Array.from({ length: size }, () => Array(size).fill(" "));

  const directions: Record<Difficulty, Direction[]> = {
    easy: [[0, 1], [1, 0]],
    medium: [[0, 1], [1, 0], [0, -1], [-1, 0]],
    difficult: [[0, 1], [1, 0], [0, -1], [-1, 0], [1, 1], [-1, -1], [1, -1], [-1, 1]],
  };

  const sortedWords = [...words]
    .map(word => word.toUpperCase())
    .sort((a, b) => b.length - a.length);

  for (const word of sortedWords) {
    if (!insertWord(word, grid, size, directions[difficulty])) {
      console.warn(`Não foi possível inserir a palavra: ${word}`);
    }
  }

  fillEmptySpaces(grid, size);

  return grid;
}

function insertWord(word: string, grid: Grid, size: number, directions: Direction[]): boolean {
  const attempts = 100;
  
  for (let i = 0; i < attempts; i++) {
    const direction = directions[Math.floor(Math.random() * directions.length)];
    const x = Math.floor(Math.random() * size);
    const y = Math.floor(Math.random() * size);

    if (canPlaceWord(word, grid, size, x, y, direction)) {
      for (let j = 0; j < word.length; j++) {
        grid[x + j * direction[0]][y + j * direction[1]] = word[j];
      }
      return true;
    }
  }
  
  return false;
}

function canPlaceWord(word: string, grid: Grid, size: number, x: number, y: number, direction: Direction): boolean {
  for (let j = 0; j < word.length; j++) {
    const nx = x + j * direction[0];
    const ny = y + j * direction[1];

    if (nx < 0 || ny < 0 || nx >= size || ny >= size || 
        (grid[nx][ny] !== " " && grid[nx][ny] !== word[j])) {
      return false;
    }
  }
  
  return true;
}

function fillEmptySpaces(grid: Grid, size: number): void {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (grid[i][j] === " ") {
        grid[i][j] = letters[Math.floor(Math.random() * letters.length)];
      }
    }
  }
}