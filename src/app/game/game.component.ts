import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import logger from '../utils/logger';
import { Player } from '../services/player.service';
import { Game, GameService } from '../services/game.service';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  private readonly log = logger('game');

  currentGame?: Game;
  currentPlayer?: Player;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly gameService: GameService,
  ) {}

  // handle already in a game
  private async tryEnterExistingGame(): Promise<boolean> {
    // TODO: remove invalid values in localstorage
    const existingGameId = localStorage.getItem('gameId');
    if (existingGameId != null) {
      const game = await this.gameService.getGame(existingGameId);
      if (game == null) {
        throw new Error(`game does not exist anymore: ${existingGameId}`);
      }
      const meInGame = localStorage.getItem('playerId');
      this.currentGame = game;
      this.currentPlayer = this.currentGame.players.find(p => p.nickname === meInGame);
      if (this.currentPlayer == undefined) {
        throw new Error('your player does not exist inside game');
      }
      return true;
    }
    return false;
  }

  // handle new game creation
  private async tryCreateNewGame(): Promise<boolean> {
    const game = window.history.state?.game;
    if (game != null) {
      this.log.debug(`found game: ${JSON.stringify(game)}`);
      this.currentGame = game;
      this.currentPlayer = game.players[0];
      localStorage.setItem('gameId', this.currentGame!._id);
      localStorage.setItem('playerId', this.currentPlayer!.nickname);
      return true;
    }
    return false;
  }

  async ngOnInit(): Promise<void> {
    // TODO: handle join existing game
    this.route.queryParams.subscribe(async params => {
      const joinGameId = params['id'];
      if (joinGameId != null) {
        this.log.debug(`joinGameId: ${joinGameId}`);
        this.log.error('UNHANDLED');
        await this.router.navigate(['home']);
        return;
      }
    });

    try {
      if (await this.tryCreateNewGame()) {
        return;
      }
    } catch (err) {
      this.log.error(`failed creating new game: ${err}`);
      await this.router.navigate(['home']);
      return;
    }

    try {
      if (await this.tryEnterExistingGame()) {
        return;
      }
    } catch (err) {
      this.log.error(`failed re-enter existing game: ${err}`);
      await this.router.navigate(['home']);
      return;
    }

    this.log.error('unknown state');
    await this.router.navigate(['home']);
  }
}
