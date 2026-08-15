import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Board } from './board';
import { DebugElement, provideZonelessChangeDetection } from '@angular/core';

describe('Board', () => {
  let component: Board;
  let fixture: ComponentFixture<Board>;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Board],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(Board);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
