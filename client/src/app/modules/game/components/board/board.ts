import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { GameService, Grid, Piece } from '../../services/game-service';
import {
  BLANK_GRID,
  BOARD_COLUMNS,
  BOARD_ROWS,
  PieceType,
  STARTING_PIECES,
} from '../../../../../utils/constants';
import { CommonModule } from '@angular/common';
import { BoardPosition, PlayerColor, Position } from '../../../../../utils/types';

@Component({
  selector: 'app-board',
  imports: [CommonModule],
  templateUrl: './board.html',
  styleUrl: './board.scss',
})
export class Board {
  @ViewChild('board') board!: ElementRef;

  @HostListener('window:resize')
  onResize() {
    this.updateBoardPosition();
  }

  curSelectedPiece: { piece: Piece; fromBoardPos: BoardPosition } | null = null;
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

  get mouseX() {
    return this.gameService.mouseX$.value;
  }

  get mouseY() {
    return this.gameService.mouseY$.value;
  }

  protected getPieceAssetFilePath(color: PlayerColor, type: PieceType) {
    return `images/pieces/${environment.pieces.ASSET_PATH}/${color}_${type}.png`;
  }

  protected updateBoardPosition() {
    const rect = this.board.nativeElement.getBoundingClientRect();
    this.gameService.boardPos$.next({
      x: rect.x,
      y: rect.y,
    });
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
      this.gameService.movePiece({
        piece: {
          color: piece.color,
          type: piece.type,
        },
        toBoardPos: piece.pos,
      });
    }
  }

  protected selectPiece(boardPos: BoardPosition, piece: Piece): void {
    this.curSelectedPiece = { piece, fromBoardPos: boardPos };
    this.gameService.clearIntersection(this.grid, boardPos);
  }

  protected unselectPiece(event: MouseEvent): void {
    if (!this.curSelectedPiece) return;

    const mousePos: Position = { x: event.clientX, y: event.clientY };
    const candidateBoardPosToPlacePiece =
      this.gameService.findNearestBoardPosFromMousePos(mousePos);

    if (candidateBoardPosToPlacePiece) {
      this.gameService.fillIntersection(
        this.grid,
        candidateBoardPosToPlacePiece,
        this.curSelectedPiece.piece,
      );
    } else {
      this.gameService.fillIntersection(
        this.grid,
        this.curSelectedPiece.fromBoardPos,
        this.curSelectedPiece.piece,
      );
    }

    this.curSelectedPiece = null;
  }

  /**
   * whenever there is a change of markers on the grid
   * from other sources, update the board right away.
   */
  private subscribeToGridChanges(): void {
    this.gameService.grid.subscribe((newGrid) => (this.grid = newGrid as Grid));
  }
}
