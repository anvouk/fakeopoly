import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import logger from '../utils/logger';
import { MatButtonModule } from '@angular/material/button';
import { PlayerService } from '../services/player.service';
import { GameService } from '../services/game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  private readonly log = logger('home');

  constructor(
    private readonly router: Router,
    private readonly gameService: GameService,
    private readonly playerService: PlayerService,
  ) {}

  async createNewGame() {
    this.log.debug('createNewGame');
    const game = await this.gameService.createNewGame({
      name: 'test-game',
    });
    await this.router.navigate(['game'], {
      state: {
        game: game,
      }
    });
  }

  async joinGame() {
    this.log.debug('joinGame');
  }
}
