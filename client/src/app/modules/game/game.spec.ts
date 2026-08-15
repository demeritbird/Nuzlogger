import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Game } from './game';
import { DebugElement, provideZonelessChangeDetection } from '@angular/core';

describe('Game', () => {
  let component: Game;
  let fixture: ComponentFixture<Game>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Game],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(Game);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
