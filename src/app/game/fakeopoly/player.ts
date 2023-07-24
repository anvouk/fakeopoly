import { PlayerPin } from './player-pin';
import { BoardTile } from './board-tile';
import { PlayerInfo } from "../../services/player.service";

export class Player {
  private readonly _playerInfo: PlayerInfo;
  private readonly _pin: PlayerPin;
  private _currentTile: BoardTile;

  public constructor(playerInfo: PlayerInfo, pin: PlayerPin, startingTile: BoardTile) {
    this._playerInfo = playerInfo;
    this._pin = pin;
    this._currentTile = startingTile;
    this._currentTile.root.add(this._pin.root);
  }

  public get info(): PlayerInfo {
    return this._playerInfo;
  }

  public get pin(): PlayerPin {
    return this._pin;
  }

  public get tile(): BoardTile {
    return this._currentTile;
  }

  public moveToTile(newTile: BoardTile) {
    const prevTile = this._currentTile;
    this._currentTile = newTile;
    this._currentTile.root.add(this._pin.root);
    prevTile.root.removeName(this._pin.root);
  }

  public moveToNextTile() {
    // TODO
    // const currentTileIdx = this._currentTile.tileInfo.id;
  }

  public moveToPrevTile() {
    // TODO
    // const currentTileIdx = this._currentTile.tileInfo.id;
  }
}
