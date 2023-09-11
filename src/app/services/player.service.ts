import pouchserverService from './pouchserver.service';

export interface PlayerInfo {
  nickname: string,
  isHost: boolean,
}

export class PlayerService {
  public async addPlayerToGame(gameId: string, playerNickname: string): Promise<void> {
    return pouchserverService.addPlayerToGame(gameId, playerNickname);
  }

  public async removePlayerFromGame(gamedId: string, playerNickname: string): Promise<void> {
    return pouchserverService.removePlayerFromGame(gamedId, playerNickname);
  }
}

export default new PlayerService();
