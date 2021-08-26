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
    this.player = window.history.state.player;
    this.token = window.history.state.token;
    this.gameId.subscribe(async value => {
      try {
        this.gameInfo = await this.gameService.getGameInfo(value, this.token);
      } catch (err) {
        await this.router.navigate([ '/game/invalid' ], {
          queryParams: { game: value }
        });
      }
    });
    this.route.params.subscribe(async params => {
      this.gameId.next(params['gameId'])
    })
  }
}
