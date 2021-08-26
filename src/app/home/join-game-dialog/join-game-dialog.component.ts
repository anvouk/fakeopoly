import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PlayerService } from '../../shared';

@Component({
  selector: 'app-join-game-dialog',
  templateUrl: './join-game-dialog.component.html',
  styleUrls: ['./join-game-dialog.component.css']
})
export class JoinGameDialogComponent {
  playerNickname: string = '';
  gameId: string = '';

  errorMsg: string | null = null;

  constructor(
    private readonly activeModal: NgbActiveModal,
    private readonly playerService: PlayerService,
  ) {}

  async close() {
    try {
      const newPlayer = await this.playerService.createNewPlayerForGame(this.gameId, {
        nickname: this.playerNickname,
        isHost: false,
      });
      this.activeModal.close({ gameId: this.gameId, ...newPlayer });
    } catch (err) {
      const error = err.response.data.error;
      switch (error.status) {
        case 404:
          this.errorMsg = 'This game does not exist';
          break;
        default:
          this.errorMsg = error.message;
          break;
      }
    }
  }

  dismiss() {
    this.activeModal.dismiss('Cancel');
  }
}
