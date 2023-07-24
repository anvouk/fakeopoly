import { PlayerPin } from './player-pin';
import { BoardTile } from './board-tile';
import { PlayerInfo } from "../../services/player.service";
import { GameStateService } from "../../services/game-state.service";

export class Player {
  private readonly _playerInfo: PlayerInfo;
  private readonly _pin: PlayerPin;
  private _currentTile: BoardTile;
  private readonly _gameStateService: GameStateService;

  public constructor(playerInfo: PlayerInfo, pin: PlayerPin, startingTile: BoardTile, gameStateService: GameStateService) {
    this._playerInfo = playerInfo;
    this._pin = pin;
    this._currentTile = startingTile;
    this._currentTile.root.add(this._pin.root);
    this._gameStateService = gameStateService;
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
    const currentTileIdx = this._currentTile.tileInfo.id;
    let nextTile;
    // loop board check
    if (currentTileIdx >= this._gameStateService.tiles.length - 1) {
      nextTile = this._gameStateService.tiles.find(t => t.tileInfo.id === 0)!;
    } else {
      nextTile = this._gameStateService.tiles.find(t => t.tileInfo.id === currentTileIdx + 1)!;
    }
    this.moveToTile(nextTile);
  }

  public moveToPrevTile() {
    const currentTileIdx = this._currentTile.tileInfo.id;
    let nextTile;
    // loop board check
    if (currentTileIdx === 0) {
      nextTile = this._gameStateService.tiles.find(t => t.tileInfo.id === this._gameStateService.tiles.length - 1)!;
    } else {
      nextTile = this._gameStateService.tiles.find(t => t.tileInfo.id === currentTileIdx - 1)!;
    }
    this.moveToTile(nextTile);
  }
}
