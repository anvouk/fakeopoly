import { PlayerPin } from './player-pin';
import { BoardTile } from './board-tile';
import { PlayerInfo } from "../../services/player.service";
import { GameStateService } from "../../services/game-state.service";

export class Player {
  private readonly _playerInfo: PlayerInfo;
  private readonly _pin: PlayerPin;
  private _currentTile: BoardTile;
  private readonly _gameStateService: GameStateService;

  private static readonly MAX_HISTORY_SIZE = 3;
  // FILO list necessary for accurate onPlayerGoesPastTile tracking
  private readonly _playerTilesIdMovesHistory: number[] = [];

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

  private setPlayerTile(newTile: BoardTile): BoardTile {
    const prevTile = this._currentTile;
    this._currentTile = newTile;
    this._currentTile.root.add(this._pin.root);
    prevTile.root.removeName(this._pin.root);
    if (this._playerTilesIdMovesHistory.unshift(prevTile.tileInfo.id) > Player.MAX_HISTORY_SIZE) {
      this._playerTilesIdMovesHistory.pop();
    }
    return prevTile;
  }

  public teleportToTile(newTile: BoardTile) {
    if (this._currentTile == newTile) {
      return;
    }
    const prevTile = this.setPlayerTile(newTile);
    if (this._gameStateService.onPlayerOnTile != null) {
      this._gameStateService.onPlayerOnTile(this, prevTile, this._currentTile);
    }
  }

  private moveToNextTile() {
    const nextTile = this._gameStateService.getNextTile(this._currentTile)
    const oldCurrentTile = this.setPlayerTile(nextTile);
    if (this._gameStateService.onPlayerGoesPastTile != null) {
      this._gameStateService.onPlayerGoesPastTile(
        this,
        this._playerTilesIdMovesHistory.length >= 2 ? this._gameStateService.getTileById(this._playerTilesIdMovesHistory[1]) : null,
        oldCurrentTile,
        nextTile,
      );
    }
  }

  private moveToPrevTile() {
    const prevTile = this._gameStateService.getPreviousTile(this._currentTile);
    const oldCurrentTile = this.setPlayerTile(prevTile);
    if (this._gameStateService.onPlayerGoesPastTile != null) {
      this._gameStateService.onPlayerGoesPastTile(
        this,
        this._playerTilesIdMovesHistory.length >= 2 ? this._gameStateService.getTileById(this._playerTilesIdMovesHistory[1]) : null,
        oldCurrentTile,
        prevTile,
      );
    }
  }

  private async moveInDirectionTimes(moveForward: boolean, movesRemaining: number): Promise<void> {
    function _move(player: Player, onDone: () => void) {
      if (movesRemaining <= 0) {
        onDone();
        return;
      }

      if (moveForward) {
        player.moveToNextTile();
      } else {
        player.moveToPrevTile();
      }
      movesRemaining--;

      if (movesRemaining <= 0) {
        onDone();
        return;
      }

      setTimeout(async () => {
        _move(player, onDone);
      }, 60);
    }

    return new Promise((resolve, _) => {
      const startingTile = this._currentTile;
      _move(this, () => {
        if (this._gameStateService.onPlayerOnTile != null) {
          this._gameStateService.onPlayerOnTile(this, startingTile, this._currentTile);
        }
        return resolve();
      });
    });
  }

  public async moveForwardTimes(movesRemaining: number): Promise<void> {
    return this.moveInDirectionTimes(true, movesRemaining);
  }

  public async moveForwardToTile(boardTile: BoardTile): Promise<void> {
    if (this._currentTile == boardTile) {
      return;
    }

    let movesRemaining: number;
    if (boardTile.tileInfo.id < this._currentTile.tileInfo.id) {
      movesRemaining = this._gameStateService.tiles.size - this._currentTile.tileInfo.id + boardTile.tileInfo.id;
    } else {
      movesRemaining = boardTile.tileInfo.id - this._currentTile.tileInfo.id;
    }
    return this.moveForwardTimes(movesRemaining);
  }

  public async moveBackwardTimes(movesRemaining: number): Promise<void> {
    return this.moveInDirectionTimes(false, movesRemaining);
  }

  public async moveBackwardToTile(boardTile: BoardTile): Promise<void> {
    if (this._currentTile == boardTile) {
      return;
    }

    let movesRemaining: number;
    if (boardTile.tileInfo.id > this._currentTile.tileInfo.id) {
      movesRemaining = this._gameStateService.tiles.size + this._currentTile.tileInfo.id - boardTile.tileInfo.id;
    } else {
      movesRemaining = this._currentTile.tileInfo.id - boardTile.tileInfo.id;
    }
    return this.moveBackwardTimes(movesRemaining);
  }
}
