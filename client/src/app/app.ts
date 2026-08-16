import { Component, signal } from '@angular/core';
import { Game } from './modules/game/game';
import { GameService } from './modules/game/services/game-service';

@Component({
  selector: 'app-root',
  imports: [Game],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('ChaosXiangqiClient');

  constructor(private gameService: GameService) {}

  updateMousePos = (event: MouseEvent) => {
    this.gameService.mouseX$.next(event.clientX);
    this.gameService.mouseY$.next(event.clientY);
  };
}
