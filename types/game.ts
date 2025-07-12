export interface Player {
  id: number;
  color: string;
  name: string;
  pieces: number[];
  score: number;
}

export interface GameState {
  currentPlayer: number;
  players: Player[];
  diceValue: number;
  isRolling: boolean;
  gameStatus: 'waiting' | 'playing' | 'finished';
  pot: number;
  winner: Player | null;
}

export interface Position {
  x: number;
  y: number;
}

export interface GameBoard {
  cells: number[][];
  safeCells: Position[];
  homeCells: Position[];
  startCells: Position[];
}