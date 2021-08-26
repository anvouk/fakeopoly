import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../environments/environment';
import { PlayerCreateNewResponse } from './player.service';

export interface GameInfo {
  game: {
    id: string,
    name: string,
    minPlayers: number,
    maxPlayers: number,
  }
}

export interface GameCreateNewRequest {
  name: string,
  minPlayers?: number,
  maxPlayers?: number,
}

export interface GameCreateNewResult extends PlayerCreateNewResponse, GameInfo {}

@Injectable({
  providedIn: 'root'
})
export class GameService {
  public async createNewGame(options: GameCreateNewRequest): Promise<GameCreateNewResult> {
    const res = await axios.post(`${environment.backendUri}/api/v1/games`, {
      game: options
    });
    return res.data as GameCreateNewResult;
  }

  public async getGameInfo(gameId: string, token: string): Promise<GameInfo> {
    const res = await axios.get(`${environment.backendUri}/api/v1/games/${gameId}`, {
      headers: {
        Authorization: `bearer ${token}`,
      }
    });
    return res.data as GameInfo;
  }

  public async editGame(gameId: string, token: string, options: GameCreateNewResult): Promise<GameInfo> {
    const res = await axios.put(`${environment.backendUri}/api/v1/games/${gameId}`,{
      game: options,
    }, {
      headers: {
        Authorization: `bearer ${token}`,
      }
    });
    return res.data as GameInfo;
  }

  public async deleteGame(gameId: string, token: string): Promise<void> {
    await axios.delete(`${environment.backendUri}/api/v1/games/${gameId}`, {
      headers: {
        Authorization: `bearer ${token}`,
      }
    });
  }
}
