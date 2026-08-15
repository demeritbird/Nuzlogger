import { TestBed } from '@angular/core/testing';

import { GameService } from './game-service';
import { provideZonelessChangeDetection } from '@angular/core';

describe('GameService', () => {
  let service: GameService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    });
    service = TestBed.inject(GameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
