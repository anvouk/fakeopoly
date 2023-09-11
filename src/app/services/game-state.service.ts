import gameService, { Game } from "./game.service";
import { Player } from "../game/fakeopoly/player";
import { BoardTile } from "../game/fakeopoly/board-tile";

/**
 * Handles high level browser game state.
 * This binds backend low level logic + browser high level visuals.
 */
export class GameStateService {
  // @ts-ignore
  private _currentGame: Game;
  // @ts-ignore
  private _currentPlayer: Player;
  private _tiles: Map<number, BoardTile> = new Map<number, BoardTile>();

  private _turn: number = 1;

  public setup(game: Game, currentPlayer: Player, tiles: BoardTile[]) {
    this._currentGame = game;
    this._currentPlayer = currentPlayer;
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

  public async turnLoop() {
    const moveNum = (await gameService.rollDices()).total;
    for (let i = moveNum; i > 0; --i) {
      this.player.moveToNextTile();
    }
  }
}

export default new GameStateService();
