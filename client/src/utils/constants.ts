import { BoardPosition, PlayerColor } from './types';

export const BOARD_COLUMNS = 9;
export const BOARD_ROWS = 10;

export const BLANK_GRID = [
  [
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
  ],
  [
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
  ],
  [
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
  ],
  [
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
  ],
  [
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
  ],
  [
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
  ],
  [
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
  ],
  [
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
  ],
  [
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
  ],
  [
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
    { pos: { x: 0, y: 0 }, piece: null },
  ],
];

export enum PieceType {
  PAWN = 'pawn', // 兵, 卒
  CHARIOT = 'chariot', // 俥, 車
  CANNON = 'cannon', // 炮, 砲
  HORSE = 'horse', // 傌, 馬
  ELEPHANT = 'elephant', // 相, 象
  ADVISOR = 'advisor', // 仕, 士
  KING = 'king', // 帥, 將
}

export const STARTING_PIECES: {
  color: PlayerColor;
  type: PieceType;
  pos: BoardPosition;
}[] = [
  // red pieces
  { color: 'red', type: PieceType.CHARIOT, pos: { row: 1, col: 1 } },
  { color: 'red', type: PieceType.CHARIOT, pos: { row: 1, col: 9 } },
  { color: 'red', type: PieceType.HORSE, pos: { row: 1, col: 2 } },
  { color: 'red', type: PieceType.HORSE, pos: { row: 1, col: 8 } },
  { color: 'red', type: PieceType.ELEPHANT, pos: { row: 1, col: 3 } },
  { color: 'red', type: PieceType.ELEPHANT, pos: { row: 1, col: 7 } },
  { color: 'red', type: PieceType.ADVISOR, pos: { row: 1, col: 4 } },
  { color: 'red', type: PieceType.ADVISOR, pos: { row: 1, col: 6 } },
  { color: 'red', type: PieceType.KING, pos: { row: 1, col: 5 } },
  { color: 'red', type: PieceType.PAWN, pos: { row: 4, col: 1 } },
  { color: 'red', type: PieceType.PAWN, pos: { row: 4, col: 3 } },
  { color: 'red', type: PieceType.PAWN, pos: { row: 4, col: 5 } },
  { color: 'red', type: PieceType.PAWN, pos: { row: 4, col: 7 } },
  { color: 'red', type: PieceType.PAWN, pos: { row: 4, col: 9 } },

  // black pieces
  { color: 'black', type: PieceType.CHARIOT, pos: { row: 10, col: 1 } },
  { color: 'black', type: PieceType.CHARIOT, pos: { row: 10, col: 9 } },
  { color: 'black', type: PieceType.HORSE, pos: { row: 10, col: 2 } },
  { color: 'black', type: PieceType.HORSE, pos: { row: 10, col: 8 } },
  { color: 'black', type: PieceType.ELEPHANT, pos: { row: 10, col: 3 } },
  { color: 'black', type: PieceType.ELEPHANT, pos: { row: 10, col: 7 } },
  { color: 'black', type: PieceType.ADVISOR, pos: { row: 10, col: 4 } },
  { color: 'black', type: PieceType.ADVISOR, pos: { row: 10, col: 6 } },
  { color: 'black', type: PieceType.KING, pos: { row: 10, col: 5 } },
  { color: 'black', type: PieceType.PAWN, pos: { row: 7, col: 1 } },
  { color: 'black', type: PieceType.PAWN, pos: { row: 7, col: 3 } },
  { color: 'black', type: PieceType.PAWN, pos: { row: 7, col: 5 } },
  { color: 'black', type: PieceType.PAWN, pos: { row: 7, col: 7 } },
  { color: 'black', type: PieceType.PAWN, pos: { row: 7, col: 9 } },
];
