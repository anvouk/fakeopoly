import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameInfo, GameService, PlayerInfo } from '../shared';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  gameId: Subject<string> = new Subject<string>();

  gameInfo?: GameInfo;

  player?: PlayerInfo;
  token: string = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly gameService: GameService,
  ) {}

  ngOnInit(): void {
    if (!this.loadPlayer()) {
      // TODO: enter game as new player
      this.player = window.history.state?.player;
      this.token = window.history.state?.token;
      this.savePlayer();
    }
    this.gameId.subscribe(async value => {
      try {
        this.gameInfo = await this.gameService.getGameInfo(value, this.token);
      } catch (err) {
        const error = err.response.data.error;
        let reason = 'unknown'
        switch (error.status) {
          case 404:
            reason = 'notFound';
            break;
          case 403:
            reason = 'forbidden';
          break;
        }
        this.clearPlayer();
        await this.router.navigate([ '/game/invalid' ], {
          queryParams: { game: value, reason: reason, }
        });
      }
    });
    this.route.params.subscribe(async params => {
      this.gameId.next(params['gameId'])
    })
  }

  private showJoinDialog() {

  }

  private loadPlayer(): boolean {
    const player = localStorage.getItem('fakeoploy-player');
    if (player != null) {
      this.player = JSON.parse(player);
    } else {
      localStorage.clear();
      return false;
    }
    const token = localStorage.getItem('fakeoploy-token');
    if (token != null) {
      this.token = JSON.parse(token);
    } else {
      localStorage.clear();
      return false;
    }
    return true;
  }

  private savePlayer() {
    if (this.player != null && this.token != null) {
      localStorage.setItem('fakeoploy-player', JSON.stringify(this.player));
      localStorage.setItem('fakeoploy-token', JSON.stringify(this.token));
    }
  }

  private clearPlayer() {
    localStorage.clear();
  }
}
