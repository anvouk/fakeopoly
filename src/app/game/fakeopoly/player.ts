import { PlayerPin } from './player-pin';
import { BoardTile } from './board-tile';

export class Player {
  private readonly _pin: PlayerPin;
  private _currentTile: BoardTile;

  public constructor(pin: PlayerPin, startingTile: BoardTile) {
    this._pin = pin;
    this._currentTile = startingTile;
  }
}
