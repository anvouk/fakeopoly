import { Injectable } from "@angular/core";
import { Game, GameService } from "./game.service";
import { Player } from "../game/fakeopoly/player";
import { BoardTile } from "../game/fakeopoly/board-tile";

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  // @ts-ignore
  private _currentGame: Game;
  // @ts-ignore
  private _currentPlayer: Player;
  private _tiles: Map<number, BoardTile> = new Map<number, BoardTile>();

  constructor(
    private readonly gameService: GameService,
  ) {}

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
}
