import gameService, { Game } from "./game.service";
import { Player } from "../game/fakeopoly/player";
import { BoardTile } from "../game/fakeopoly/board-tile";
import Swal from 'sweetalert2';
import { fakePlayerPins, TileType } from '../game/fakeopoly/fake-data';
import { PlayerPin } from '../game/fakeopoly/player-pin';

export type OnPlayerOnTile = (player: Player, arrivesFrom: BoardTile | null, arrivesTo: BoardTile) => void;
export type OnPlayerGoesPastTile = (player: Player, arrivesFrom: BoardTile | null, passesTile: BoardTile, nextTile: BoardTile) => void;

/**
 * Handles high level browser game state.
 * This binds backend low level logic + browser high level visuals.
 */
export class GameStateService {
  private _tiles: Map<number, BoardTile> = new Map<number, BoardTile>();
  private _turn: number = 1;

  /**
   * Player moved and landed on this tile. Callback also invoked after teleport.
   */
  public readonly onPlayerOnTile: OnPlayerOnTile;

  /**
   * Player moved and passed this tile, so he's either on the previous
   * or next tile. This callback is not invoked on teleport.
   */
  public readonly onPlayerGoesPastTile: OnPlayerGoesPastTile;

  private _players: Player[] = [];
  // @ts-ignore
  private _currentPlayer: Player;
  // @ts-ignore
  private _currentGame: Game;

  public constructor() {
    this.onPlayerOnTile = (player, arrivesFrom, arrivesTo) => {
      console.debug(`player: '${player.info.nickname}' arrived at destination: ${arrivesTo.tileInfo.id} from ${arrivesFrom?.tileInfo?.id ?? 'unknown'}`);
      switch (arrivesTo.tileInfo.type) {
        case TileType.Corner:
          // TODO: handle prison
          break;
        case TileType.Regular:
          // TODO: check ownership and offer to buy
          break;
        case TileType.Special:
          // TODO: check ownership and offer to buy for stations
          break;
      }
    };
    this.onPlayerGoesPastTile = (player, arrivesFrom, passesTile, nextTile) => {
      console.debug(`player: '${player.info.nickname}' arrived from tile: ${arrivesFrom?.tileInfo?.id ?? 'unknown'} got past to ${passesTile.tileInfo.id} ending up at ${nextTile.tileInfo.id}`);
      if (arrivesFrom?.tileInfo?.id === 39 && passesTile.tileInfo.id === 0 && nextTile.tileInfo.id === 1) {
        // TODO
        console.log(`!!!! allocating funds to player: ${player.info.nickname} !!!!`);
      }
    };
  }

  public setup(game: Game, playersStartingTile: BoardTile, tiles: BoardTile[]) {
    this._players = game.playersInfo.map(p => new Player(p, new PlayerPin(fakePlayerPins[0]), playersStartingTile, this));
    this._players.push(new Player({ nickname: 'test-player-2', isHost: false }, new PlayerPin(fakePlayerPins[0]), playersStartingTile, this));
    this._currentPlayer = this._players[0];

    this._currentGame = game;
    tiles.forEach(t => this._tiles.set(t.tileInfo.id, t));
  }

  public get game(): Game {
    return this._currentGame;
  }

  public get player(): Player {
    return this._currentPlayer;
  }

  public get tiles(): Map<number, BoardTile> {
    return this._tiles;
  }

  public getTileById(id: number): BoardTile {
    // using modulo to ensure no out-of-bounds error will ever occur.
    return this._tiles.get(Math.abs(id) % this._tiles.size)!;
  }

  public getPreviousTile(tile: BoardTile): BoardTile {
    if (tile.tileInfo.id === 0) {
      return this._tiles.get(this._tiles.size - 1)!;
    }
    return this.getTileById(tile.tileInfo.id - 1);
  }

  public getNextTile(tile: BoardTile): BoardTile {
    return this.getTileById(tile.tileInfo.id + 1);
  }

  public async advanceTurn() {
    await Swal.fire({
      title: "Your Turn",
      timer: 1500,
      timerProgressBar: true,
      theme: 'borderless',
    });
  }

  // TODO: convert in turn lock
  private _doneMoving: boolean = true;

  public async turnLoop() {
    if (!this._doneMoving) {
      console.warn('player is still moving! skipping...');
      return;
    }

    const moveNum = (await gameService.rollDices()).total;
    console.log(`dice rolled: ${moveNum}`);

    this._doneMoving = false;
    try {
      await this.player.moveForwardTimes(moveNum);
    } finally {
      this._doneMoving = true;
    }
  }
}

export default new GameStateService();
