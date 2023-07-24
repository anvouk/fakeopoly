import { Injectable } from '@angular/core';
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
  private _tiles: BoardTile[] = [];

  constructor(
    private readonly gameService: GameService,
  ) {}

  public setup(game: Game, currentPlayer: Player, tiles: BoardTile[]) {
    this._currentGame = game;
    this._currentPlayer = currentPlayer;
    this._tiles = tiles;
  }

  public get game(): Game {
    return this._currentGame;
  }

  public get player(): Player {
    return this._currentPlayer;
  }

  public get tiles(): BoardTile[] {
    return this._tiles;
  }
}
