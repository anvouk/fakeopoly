import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb-browser';
import { GameCreationOptions, Game } from './game.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class PouchserverService {
  private readonly dbGames = new PouchDB<Game>('games');

  public async createNewGame(options: GameCreationOptions): Promise<Game> {
    const game: Game = {
      _id: uuidv4(),
      name: options.name,
      minPlayers: options.minPlayers || 2,
      maxPlayers: options.maxPlayers || 8,
      playersInfo: [
        {
          nickname: 'hostUser',
          isHost: true,
        }
      ],
    };
    console.log(`new game: ${JSON.stringify(game)}`);
    await this.dbGames.put(game);
    return game;
  }

  public async getGame(gameId: string): Promise<Game | null> {
    console.log(`getGame: ${gameId}`);
    let game: Game;
    try {
      game = await this.dbGames.get(gameId);
    } catch (err) {
      // @ts-ignore
      if (err.name === 'not_found') {
        console.log('warning: game does not exist');
        return null;
      }
      console.error(`error: failed retrieving game: ${err}`);
      throw err;
    }

    return game;
  }

  public async editGame(gameId: string, options: GameCreationOptions): Promise<Game> {
    console.log(`editGame: ${gameId}`);
    const game = await this.getGame(gameId);
    if (game == null) {
      throw new Error('cannot edit game since it does not exist');
    }

    const editedGame: Game = {
      ...game,
      ...options,
    }
    await this.dbGames.put(editedGame);

    return editedGame;
  }

  public async deleteGame(gameId: string): Promise<void> {
    console.log(`deleteGame: ${gameId}`);
    const game = await this.getGame(gameId);
    if (game == null) {
      throw new Error('cannot delete game since it does not exist');
    }

    await this.dbGames.put({
      ...game,
      _deleted: true,
    });
  }

  public async addPlayerToGame(gameId: string, playerNickname: string): Promise<void> {
    const game = await this.getGame(gameId);
    if (game == null) {
      throw new Error('cannot add player to game since game does not exist');
    }

    if (game.playersInfo.length >= game.maxPlayers) {
      throw new Error('cannot add player to game since players limit reached');
    }

    game.playersInfo.push({
      nickname: playerNickname,
      isHost: false,
    });
    await this.dbGames.put(game);
  }

  public async removePlayerFromGame(gameId: string, playerNickname: string): Promise<void> {
    const game = await this.getGame(gameId);
    if (game == null) {
      throw new Error('cannot remove player to game since game does not exist');
    }

    const playerToRemoveIdx = game.playersInfo.findIndex(p => p.nickname === playerNickname);
    if (playerToRemoveIdx == -1) {
      throw new Error('cannot remove player to game since player does not exist');
    }

    game.playersInfo.splice(playerToRemoveIdx, 1);
    await this.dbGames.put(game);
  }
}
