import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BoardPosition, Nine, PlayerColor, Position, Ten } from '../../../../utils/types';
import { BOARD_COLUMNS, BOARD_ROWS, PieceType } from '../../../../utils/constants';

type Piece = { color: PlayerColor; type: PieceType };

type Intersection = {
  pos: Position;
  piece: Piece | null;
};

export type Grid = Ten<Nine<Intersection>>; // 9 columns & 10 rows

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private grid$: BehaviorSubject<Grid | null> = new BehaviorSubject<Grid | null>(null);

  get grid() {
    return this.grid$.asObservable();
  }

  /**
   * update the board with a new grid.
   * separate from updatePiece this is less expensive if all squares need to be changed.
   *
   * @param {Grid} grid incoming grid
   */
  public updateBoard(grid: Grid): void {
    this.grid$.next(grid);
  }

  /**
   * updates the position of a piece marker on the board by adding its marker
   * to a position and removing any marker from the last position, if any.
   *
   * @param {Piece} param.piece the piece making the movement
   * @param {BoardPosition} param.toBoardPos which position the piece is moving to
   * @param {BoardPosition} param.fromBoardPos which position the piece is moving from
   */
  public updatePiece({
    piece,
    toBoardPos,
    fromBoardPos,
  }: {
    piece: Piece;
    toBoardPos: BoardPosition;
    fromBoardPos?: BoardPosition;
  }): void {
    const grid = this.grid$.value?.map((row) => [...row]) as Grid;
    if (!grid) throw new Error('Grid has not been initialised');

    const isBoardPosOutOfBounds =
      toBoardPos.row <= 0 ||
      toBoardPos.row > BOARD_ROWS ||
      toBoardPos.col <= 0 ||
      toBoardPos.col > BOARD_COLUMNS;

    if (isBoardPosOutOfBounds) {
      throw new Error('Cannot use row or column position larger than the xiangqi board');
    }

    // `index - 1` as the indexing of row and columns start from 1
    // instead of 0
    grid[toBoardPos.row - 1][toBoardPos.col - 1] = {
      ...grid[toBoardPos.row - 1][toBoardPos.col - 1],
      piece,
    };

    // if piece came from an old position, clear up that position
    if (fromBoardPos) {
      grid[fromBoardPos.row - 1][fromBoardPos.col - 1] = {
        ...grid[fromBoardPos.row - 1][fromBoardPos.col - 1],
        piece: null,
      };
    }

    this.updateBoard(grid);
  }
}
