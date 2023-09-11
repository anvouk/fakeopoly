import pouchserverService from './pouchserver.service';
import { PlayerInfo } from './player.service';

export interface Game {
  _id: string,
  name: string,
  minPlayers: number,
  maxPlayers: number,
  playersInfo: PlayerInfo[],
}

export interface GameCreationOptions {
  name: string,
  minPlayers?: number,
  maxPlayers?: number,
}

export class DiceRoll {
  constructor(
    public readonly d1: number,
    public readonly d2: number,
  ) {}

  public get total(): number {
    return this.d1 + this.d2;
  }
}

/**
 * Handles low level interactions with backend.
 */
export class GameService {
  public async createNewGame(options: GameCreationOptions): Promise<Game> {
    return pouchserverService.createNewGame(options);
  }

  public async getGame(gameId: string): Promise<Game | null> {
    return pouchserverService.getGame(gameId);
  }

  public async editGame(gameId: string, options: GameCreationOptions): Promise<Game> {
    return pouchserverService.editGame(gameId, options);
  }

  public async deleteGame(gameId: string): Promise<void> {
    return pouchserverService.deleteGame(gameId);
  }

  public async rollDices(): Promise<DiceRoll> {
    return pouchserverService.rollDices();
  }
}

export default new GameService();
