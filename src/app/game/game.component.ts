import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import logger from '../utils/logger';
import { Player } from '../services/player.service';
import { Game, GameService } from '../services/game.service';
import Konva from 'konva';
import { FakeTile } from './fakeopoly/fake-tile';
import { fakeCornerTiles, fakeTiles } from './fakeopoly/fake-data';
import { CornerTile } from './fakeopoly/corner-Tile';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  private readonly log = logger('game');

  private static readonly WIDTH = 1220;
  private static readonly HEIGHT = 1220;

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

  private setupCanvas() {
    const stage = new Konva.Stage({
      container: 'konva-canvas',
      width: GameComponent.WIDTH,
      height: GameComponent.HEIGHT,
    });

    const layer = new Konva.Layer();

    const backgroud = new Konva.Rect({
      width: GameComponent.WIDTH,
      height: GameComponent.HEIGHT,
      fill: '#76915c',
    });
    layer.add(backgroud);

    this.log.debug('begin map draw');

    const CornerBottomLeft = new CornerTile(
      0,
      GameComponent.HEIGHT - CornerTile.HEIGHT,
      0,
      fakeCornerTiles[0]
    );
    layer.add(CornerBottomLeft.root);

    let batch = 1;

    // LEFT
    for (let i = batch - 1; i < batch * 9; ++i) {
      const tile = new FakeTile(
        FakeTile.HEIGHT,
        GameComponent.HEIGHT - CornerTile.HEIGHT - FakeTile.WIDTH - (i * FakeTile.WIDTH),
        90,
        fakeTiles[i]
      );
      layer.add(tile.root);
    }

    const cornerLeft = new CornerTile(
      CornerTile.HEIGHT,
      0,
      90,
      fakeCornerTiles[1],
    );
    layer.add(cornerLeft.root);

    // UP
    for (let i = batch - 1; i < batch * 9; ++i) {
      const tile = new FakeTile(
        CornerTile.WIDTH + FakeTile.WIDTH + (i * FakeTile.WIDTH),
        FakeTile.HEIGHT,
        180,
        fakeTiles[i]
      );
      layer.add(tile.root);
    }

    const cornerRight = new CornerTile(
      GameComponent.HEIGHT,
      CornerTile.WIDTH,
      180,
      fakeCornerTiles[2],
    );
    layer.add(cornerRight.root);

    // RIGHT
    for (let i = batch - 1; i < batch * 9; ++i) {
      const tile = new FakeTile(
        GameComponent.WIDTH - FakeTile.HEIGHT,
        CornerTile.HEIGHT + FakeTile.WIDTH + (i * FakeTile.WIDTH),
        270,
        fakeTiles[i]
      );
      layer.add(tile.root);
    }

    const cornerBottomRight = new CornerTile(
      GameComponent.HEIGHT - CornerTile.WIDTH,
      GameComponent.WIDTH,
      270,
      fakeCornerTiles[3],
      );
    layer.add(cornerBottomRight.root);

    // BOTTOM
    for (let i = batch - 1; i < batch * 9; ++i) {
      const tile = new FakeTile(
        GameComponent.WIDTH - CornerTile.WIDTH - FakeTile.WIDTH - (i * FakeTile.WIDTH),
        GameComponent.HEIGHT - FakeTile.HEIGHT,
        0,
        fakeTiles[i]
      );
      layer.add(tile.root);
    }

    this.log.debug('end map draw');

    // circle.on('pointerclick', function () {
    //   console.log('Mouseup circle');
    // });

    stage.add(layer);
    layer.draw();
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

    let gameReady: boolean = false;

    try {
      gameReady = await this.tryCreateNewGame();
    } catch (err) {
      this.log.error(`failed creating new game: ${err}`);
      await this.router.navigate(['home']);
      return;
    }

    try {
      if (!gameReady) {
        gameReady = await this.tryEnterExistingGame();
      }
    } catch (err) {
      this.log.error(`failed re-enter existing game: ${err}`);
      await this.router.navigate(['home']);
      return;
    }

    if (!gameReady) {
      this.log.error('unknown state');
      await this.router.navigate(['home']);
      return;
    }

    this.setupCanvas();
  }
}
