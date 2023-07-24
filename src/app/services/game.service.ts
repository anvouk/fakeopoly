import { Injectable } from '@angular/core';
import { PouchserverService } from './pouchserver.service';
import { PlayerInfo } from './player.service';

export interface Game {
  _id: string,
  name: string,
  minPlayers: number,
  maxPlayers: number,
  players: PlayerInfo[],
}

export interface GameCreationOptions {
  name: string,
  minPlayers?: number,
  maxPlayers?: number,
}

@Injectable({
  providedIn: 'root'
})
export class GameService {
  constructor(
    private readonly pouchServer: PouchserverService
  ) {}

  public async createNewGame(options: GameCreationOptions): Promise<Game> {
    return this.pouchServer.createNewGame(options);
  }

  public async getGame(gameId: string): Promise<Game | null> {
    return this.pouchServer.getGame(gameId);
  }

  public async editGame(gameId: string, options: GameCreationOptions): Promise<Game> {
    return this.pouchServer.editGame(gameId, options);
  }

  public async deleteGame(gameId: string): Promise<void> {
    return this.pouchServer.deleteGame(gameId);
  }
}
