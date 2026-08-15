import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Nine, Position, Ten } from '../../../../utils/types';

type Piece = string;

type Intersection = {
  pos: Position;
  piece: Piece | null;
};
export type Grid = Ten<Nine<Intersection>>; // 9 columns & 10 rows

@Injectable({
  providedIn: 'root',
})
export class GameService {
  public grid$: BehaviorSubject<Grid | null> = new BehaviorSubject<Grid | null>(null);
}
