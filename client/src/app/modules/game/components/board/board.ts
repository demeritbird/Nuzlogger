import { Component, ElementRef, ViewChild } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { GameService, Grid } from '../../services/game-service';
import { BLANK_GRID } from '../../../../../utils/constants';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-board',
  imports: [CommonModule],
  templateUrl: './board.html',
  styleUrl: './board.scss',
})
export class Board {
  @ViewChild('board') board!: ElementRef;

  boardFilePath?: string = '';
  grid: Grid = BLANK_GRID as Grid;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.initBoard();
    this.initGrid();
  }

  private initBoard(): void {
    this.boardFilePath = `images/boards/${environment.map.ASSET_FILE}`;
  }

  private initGrid() {
    const { GRID_OFFSET, CELL_OFFSET } = environment.map;
    const BOARD_COLUMNS = 9;
    const BOARD_ROWS = 10;

    let currentOffsetX: number = GRID_OFFSET.x;
    let currentOffsetY: number = GRID_OFFSET.y;

    // loop through rows then columns as elements are first wrapped around columns
    for (let rowIdx = 0; rowIdx < BOARD_ROWS; rowIdx++) {
      for (let colIdx = 0; colIdx < BOARD_COLUMNS; colIdx++) {
        this.grid[rowIdx][colIdx] = { pos: { x: currentOffsetX, y: currentOffsetY }, piece: null };

        currentOffsetX += CELL_OFFSET.x;
      }
      currentOffsetX = GRID_OFFSET.x; // reset x after every row
      currentOffsetY += CELL_OFFSET.y;
    }

    console.log(this.grid);
    this.gameService.grid$.next(this.grid);
  }
}
