import { Component } from '@angular/core';
import { GameService, PlayerCreateNewResponse, PlayerInfo, PlayerService } from '../shared';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JoinGameDialogComponent } from './join-game-dialog/join-game-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(
    private readonly gameService: GameService,
    private readonly playerService: PlayerService,
    private readonly router: Router,
    private readonly modalService: NgbModal,
  ) {}

  async createNewGame() {
    const createdGameInfo = await this.gameService.createNewGame({
      name: 'test-game',
      minPlayers: 2,
      maxPlayers: 8
    });
    const gameId = createdGameInfo.game.id;
    const token = createdGameInfo.token;
    await this.enterGame(gameId, createdGameInfo, token);
  }

  async joinGame() {
    try {
      const modalRef = this.modalService.open(JoinGameDialogComponent);
      const result = await modalRef.result;
      if (result !== 'Cancel') {
        const gameId = result.gameId;
        const newPlayer = result.player;
        const token = result.token;
        console.log(`joining game: ${gameId} as player: ${newPlayer.nickname}`);
        await this.enterGame(gameId, { player: newPlayer }, token);
      }
    } catch (_) {
      // modal is dismissed
    }
  }

  private async enterGame(gameId: string, player: PlayerInfo, token: string): Promise<void> {
    await this.router.navigate([ '/game', gameId ], {
      state: {
        player: player.player,
        token: token,
      }
    });
  }
}
