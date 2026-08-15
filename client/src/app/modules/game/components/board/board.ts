import { Component, ElementRef, ViewChild } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { GameService, Grid } from '../../services/game-service';
import {
  BLANK_GRID,
  BOARD_COLUMNS,
  BOARD_ROWS,
  PieceType,
  STARTING_PIECES,
} from '../../../../../utils/constants';
import { CommonModule } from '@angular/common';
import { PlayerColor } from '../../../../../utils/types';

@Component({
  selector: 'app-board',
  imports: [CommonModule],
  templateUrl: './board.html',
  styleUrl: './board.scss',
})
export class Board {
  @ViewChild('board') board!: ElementRef;

  boardFilePath: string = '';
  piecesFilePath: string = '';
  grid: Grid = BLANK_GRID as Grid;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.initBoard();
    this.initGrid();
    this.initPieces();

    this.subscribeToGridChanges();
  }

  get boardAssetFilePath() {
    return this.boardFilePath;
  }

  public getPieceAssetFilePath(color: PlayerColor, type: PieceType) {
    return `images/pieces/${environment.pieces.ASSET_PATH}/${color}_${type}.png`;
  }

  /**
   * creates the board using an image
   */
  private initBoard(): void {
    this.boardFilePath = `images/boards/${environment.map.ASSET_FILE}`;
  }

  /**
   * creates the grid pattern on the board that imitates how
   * pieces control different squares on a board.
   */
  private initGrid(): void {
    const { GRID_OFFSET, CELL_OFFSET } = environment.map;

    let currentOffsetX: number = GRID_OFFSET.x;
    let currentOffsetY: number = GRID_OFFSET.y;

    // loop through rows then columns as elements are first wrapped around columns
    for (let rowIdx = 0; rowIdx < BOARD_ROWS; rowIdx++) {
      for (let colIdx = 0; colIdx < BOARD_COLUMNS; colIdx++) {
        this.grid[rowIdx][colIdx] = { pos: { x: currentOffsetX, y: currentOffsetY }, piece: null };

        currentOffsetX += CELL_OFFSET.x;
      }
      currentOffsetX = GRID_OFFSET.x; // reset offsetX after every row
      currentOffsetY += CELL_OFFSET.y;
    }

    this.gameService.updateBoard(this.grid);
  }

  /**
   * creates markers for the different starting pieces on the board
   */
  private initPieces(): void {
    for (const piece of STARTING_PIECES) {
      this.gameService.updatePiece({
        piece: {
          color: piece.color,
          type: piece.type,
        },
        toBoardPos: piece.pos,
      });
    }
  }

  /**
   * whenever there is a change of markers on the grid
   * from other sources, update the board right away.
   */
  private subscribeToGridChanges(): void {
    this.gameService.grid.subscribe((newGrid) => (this.grid = newGrid as Grid));
  }
}
