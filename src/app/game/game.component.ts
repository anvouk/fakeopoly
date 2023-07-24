import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Game, GameService } from '../services/game.service';
import Konva from 'konva';
import { BoardTile } from './fakeopoly/board-tile';
import { fakePlayerPins, fakeTiles, TileInfo } from "./fakeopoly/fake-data";
import ContextMenuManager from './fakeopoly/context-menu-manager';
import { Player } from "./fakeopoly/player";
import { PlayerPin } from "./fakeopoly/player-pin";

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  private static readonly WIDTH = 1220;
  private static readonly HEIGHT = 1220;

  currentGame?: Game;
  currentPlayer?: Player;

  private readonly tiles: BoardTile[] = [];

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
      this.currentGame = game;
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
      console.log(`found game: ${JSON.stringify(game)}`);
      this.currentGame = game;
      this.currentPlayer = game.players[0];
      const meInGame = localStorage.getItem('playerId');
      const me = game.players.find((p: any) => p.nickname === meInGame)!;
      localStorage.setItem('gameId', this.currentGame!._id);
      localStorage.setItem('playerId', me.nickname);
      return true;
    }
    return false;
  }

  private setupCanvas() {
    const stage = new Konva.Stage({
      container: 'konva-canvas',
      x: GameComponent.WIDTH / 2,
      y: GameComponent.HEIGHT / 2,
      width: GameComponent.WIDTH,
      height: GameComponent.HEIGHT,
    });

    // register empty right click event simply to prevent default
    // context menu, which is annoying.
    stage.on('contextmenu', (e) => {
      e.evt.preventDefault();
    });

    const layer = new Konva.Layer({
      x: -GameComponent.WIDTH / 2,
      y: -GameComponent.HEIGHT / 2,
    });

    const backgroud = new Konva.Rect({
      width: GameComponent.WIDTH,
      height: GameComponent.HEIGHT,
      fill: '#76915c',
    });
    layer.add(backgroud);

    console.log('begin map draw');

    let i = 0;

    const CornerBottomLeft = new BoardTile(0, GameComponent.HEIGHT - BoardTile.CORNER_HEIGHT, 0, fakeTiles[i]);
    layer.add(CornerBottomLeft.root);
    this.tiles.push(CornerBottomLeft);
    ++i;

    // LEFT
    for (; i < fakeTiles.length; ++i) {
      if (fakeTiles[i].type === 'corner') {
        break;
      }
      const tile = new BoardTile(
        BoardTile.HEIGHT,
        GameComponent.HEIGHT - BoardTile.CORNER_HEIGHT - BoardTile.WIDTH - ((i - 1) % 9) * BoardTile.WIDTH,
        90,
        fakeTiles[i],
      );
      layer.add(tile.root);
      this.tiles.push(tile);
    }

    const cornerLeft = new BoardTile(BoardTile.CORNER_HEIGHT, 0, 90, fakeTiles[i]);
    layer.add(cornerLeft.root);
    this.tiles.push(cornerLeft);
    ++i;

    // UP
    for (; i < fakeTiles.length; ++i) {
      if (fakeTiles[i].type === 'corner') {
        break;
      }
      const tile = new BoardTile(
        BoardTile.CORNER_WIDTH + BoardTile.WIDTH + ((i - 2) % 9) * BoardTile.WIDTH,
        BoardTile.HEIGHT,
        180,
        fakeTiles[i],
      );
      layer.add(tile.root);
      this.tiles.push(tile);
    }

    const cornerRight = new BoardTile(GameComponent.HEIGHT, BoardTile.CORNER_WIDTH, 180, fakeTiles[i]);
    layer.add(cornerRight.root);
    this.tiles.push(cornerRight);
    ++i;

    // RIGHT
    for (; i < fakeTiles.length; ++i) {
      if (fakeTiles[i].type === 'corner') {
        break;
      }
      const tile = new BoardTile(
        GameComponent.WIDTH - BoardTile.HEIGHT,
        BoardTile.CORNER_HEIGHT + BoardTile.WIDTH + ((i - 3) % 9) * BoardTile.WIDTH,
        270,
        fakeTiles[i],
      );
      layer.add(tile.root);
      this.tiles.push(tile);
    }

    const cornerBottomRight = new BoardTile(
      GameComponent.HEIGHT - BoardTile.CORNER_WIDTH,
      GameComponent.WIDTH,
      270,
      fakeTiles[i],
    );
    layer.add(cornerBottomRight.root);
    this.tiles.push(cornerBottomRight);
    ++i;

    // BOTTOM
    for (; i < fakeTiles.length; ++i) {
      if (fakeTiles[i].type === 'corner') {
        break;
      }
      const tile = new BoardTile(
        GameComponent.WIDTH - BoardTile.CORNER_WIDTH - BoardTile.WIDTH - ((i - 4) % 9) * BoardTile.WIDTH,
        GameComponent.HEIGHT - BoardTile.HEIGHT,
        0,
        fakeTiles[i],
      );
      layer.add(tile.root);
      this.tiles.push(tile);
    }

    console.log('end map draw');

    // circle.on('pointerclick', function () {
    //   console.log('Mouseup circle');
    // });

    // player setup
    const meInGame = localStorage.getItem('playerId');
    this.currentPlayer = new Player(
      this.currentGame!.players.find((p) => p.nickname === meInGame)!,
      new PlayerPin(fakePlayerPins[0]),
      CornerBottomLeft
    );

    stage.add(layer);
    layer.draw();

    ContextMenuManager.setup(stage, this.currentPlayer);
  }

  async ngOnInit(): Promise<void> {
    // TODO: handle join existing game
    this.route.queryParams.subscribe(async (params) => {
      const joinGameId = params['id'];
      if (joinGameId != null) {
        console.log(`joinGameId: ${joinGameId}`);
        console.error('UNHANDLED');
        await this.router.navigate(['home']);
        return;
      }
    });

    let gameReady: boolean = false;

    try {
      gameReady = await this.tryCreateNewGame();
    } catch (err) {
      console.error(`failed creating new game: ${err}`);
      await this.router.navigate(['home']);
      return;
    }

    try {
      if (!gameReady) {
        gameReady = await this.tryEnterExistingGame();
      }
    } catch (err) {
      console.error(`failed re-enter existing game: ${err}`);
      await this.router.navigate(['home']);
      return;
    }

    if (!gameReady) {
      console.error('unknown state');
      await this.router.navigate(['home']);
      return;
    }

    this.setupCanvas();
  }
}
