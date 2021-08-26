import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../environments/environment';

export interface PlayerCreateNewRequest {
  nickname: string,
  isHost: boolean,
}

export interface PlayerCreateNewResponse extends PlayerInfo {
  token: string,
}

export interface PlayerInfo {
  player: {
    id: string,
    nickname: string,
    isHost: boolean,
  }
}

export interface PlayerGetInGame {
  players: {
    id: string,
    nickname: string,
    isHost: boolean,
  }[]
}

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  public async createNewPlayerForGame(gameId: string, options: PlayerCreateNewRequest): Promise<PlayerCreateNewResponse> {
    const res = await axios.post(`${environment.backendUri}/api/v1/games/${gameId}/players`, {
      player: options
    });
    return res.data as PlayerCreateNewResponse;
  }

  public async getPlayerInfo(gameId: string, playerId: string, token: string): Promise<PlayerInfo> {
    const res = await axios.get(`${environment.backendUri}/api/v1/games/${gameId}/players/${playerId}`, {
      headers: {
        Authorization: `bearer ${token}`,
      }
    });
    return res.data as PlayerInfo;
  }

  public async getPlayersInGame(gameId: string, token: string): Promise<PlayerGetInGame> {
    const res = await axios.get(`${environment.backendUri}/api/v1/games/${gameId}/players`, {
      headers: {
        Authorization: `bearer ${token}`,
      }
    });
    return res.data as PlayerGetInGame;
  }

  public async editPlayer(gameId: string, playerId: string, token: string, options: PlayerCreateNewRequest): Promise<PlayerInfo> {
    const res = await axios.put(`${environment.backendUri}/api/v1/games/${gameId}/players/${playerId}`,{
      player: options,
    }, {
      headers: {
        Authorization: `bearer ${token}`,
      }
    });
    return res.data as PlayerInfo;
  }

  public async deletePlayer(gameId: string, playerId: string, token: string): Promise<void> {
    await axios.delete(`${environment.backendUri}/api/v1/games/${gameId}/players/${playerId}`, {
      headers: {
        Authorization: `bearer ${token}`,
      }
    });
  }
}
