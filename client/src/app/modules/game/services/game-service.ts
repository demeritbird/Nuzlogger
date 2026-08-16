import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BoardPosition, Nine, PlayerColor, Position, Ten } from '../../../../utils/types';
import { BOARD_COLUMNS, BOARD_ROWS, PieceType } from '../../../../utils/constants';
import { environment } from '../../../../environments/environment';

export type Piece = { color: PlayerColor; type: PieceType };

export type Intersection = {
  pos: Position;
  piece: Piece | null;
};

export type Grid = Ten<Nine<Intersection>>; // 9 columns & 10 rows

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private grid$: BehaviorSubject<Grid | null> = new BehaviorSubject<Grid | null>(null);

  public boardPos$: BehaviorSubject<Position | null> = new BehaviorSubject<Position | null>(null);
  public mouseX$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public mouseY$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  get grid() {
    return this.grid$.asObservable();
  }

  get gridAsValue() {
    const grid = this.grid$.value?.map((row) => [...row]) as Grid;
    if (!grid) throw new Error('Grid has not been initialised');

    return grid;
  }

  get gridAsPos() {
    return this.gridAsValue.map((row) => row.map((col) => col.pos));
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
  public movePiece({
    piece,
    toBoardPos,
    fromBoardPos,
  }: {
    piece: Piece;
    toBoardPos?: BoardPosition;
    fromBoardPos?: BoardPosition;
  }): void {
    const grid = this.gridAsValue;

    // if piece came from an old position, clear up that position
    if (toBoardPos) {
      this.fillIntersection(grid, toBoardPos, piece);
    }

    if (fromBoardPos) {
      this.clearIntersection(grid, fromBoardPos);
    }
  }

  public fillIntersection(grid: Grid, toBoardPos: BoardPosition, piece: Piece): void {
    const isToBoardPosOutOfBounds =
      toBoardPos.row <= 0 ||
      toBoardPos.row > BOARD_ROWS ||
      toBoardPos.col <= 0 ||
      toBoardPos.col > BOARD_COLUMNS;

    if (isToBoardPosOutOfBounds) {
      throw new Error('toBoardPos cannot use row or column position larger than the xiangqi board');
    }

    // `index - 1` as the indexing of row and columns start from 1
    // instead of 0
    grid[toBoardPos.row - 1][toBoardPos.col - 1] = {
      ...grid[toBoardPos.row - 1][toBoardPos.col - 1],
      piece,
    };

    this.updateBoard(grid);
  }

  public clearIntersection(grid: Grid, fromBoardPos: BoardPosition): void {
    const isFromBoardPosOutOfBounds =
      fromBoardPos.row <= 0 ||
      fromBoardPos.row > BOARD_ROWS ||
      fromBoardPos.col <= 0 ||
      fromBoardPos.col > BOARD_COLUMNS;

    if (isFromBoardPosOutOfBounds) {
      throw new Error(
        'fromBoardPos cannot use row or column position larger than the xiangqi board',
      );
    }

    grid[fromBoardPos.row - 1][fromBoardPos.col - 1] = {
      ...grid[fromBoardPos.row - 1][fromBoardPos.col - 1],
      piece: null,
    };

    this.updateBoard(grid);
  }

  public findNearestBoardPosFromMousePos(mousePos: Position): BoardPosition | null {
    const { WITHIN_INTERSECTION_RANGE } = environment.map;

    for (let rowIdx = 0; rowIdx < BOARD_ROWS; rowIdx++) {
      for (let colIdx = 0; colIdx < BOARD_COLUMNS; colIdx++) {
        const intersection = this.gridAsValue[rowIdx][colIdx];

        const diffX = Math.abs(mousePos.x - intersection.pos.x - (this.boardPos$.value?.x ?? 0));
        const diffY = Math.abs(mousePos.y - intersection.pos.y - (this.boardPos$.value?.y ?? 0));
        const mouseDropIsWithinBounds =
          diffX <= WITHIN_INTERSECTION_RANGE && diffY <= WITHIN_INTERSECTION_RANGE;

        const foundPos = {
          row: rowIdx + 1,
          col: colIdx + 1,
        };

        if (mouseDropIsWithinBounds) return foundPos;
      }
    }

    return null;
  }
}
