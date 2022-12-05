import { Injectable } from '@angular/core';
import { PouchserverService } from './pouchserver.service';

export interface Player {
  nickname: string,
  isHost: boolean,
}

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  constructor(
    private readonly pouchServer: PouchserverService
  ) {}

  public async addPlayerToGame(gameId: string, playerNickname: string): Promise<void> {
    return this.pouchServer.addPlayerToGame(gameId, playerNickname);
  }

  public async removePlayerFromGame(gamedId: string, playerNickname: string): Promise<void> {
    return this.pouchServer.removePlayerFromGame(gamedId, playerNickname);
  }
}
