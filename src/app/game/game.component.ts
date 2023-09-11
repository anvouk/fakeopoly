import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import Konva from 'konva';
import { BoardTile } from './fakeopoly/board-tile';
import { fakePlayerPins, fakeTiles } from "./fakeopoly/fake-data";
import contextMenuManager from './fakeopoly/context-menu-manager';
import { Player } from "./fakeopoly/player";
import { PlayerPin } from "./fakeopoly/player-pin";
import gameService from "../services/game.service";
import gameStateService from "../services/game-state.service";

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

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {}

  private async setupCanvas(gameId: string) {
    const game = await gameService.getGame(gameId);
    if (game == null) {
      throw new Error(`game does not exist: ${gameId}`);
    }

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

    let tiles: BoardTile[] = [];
    let i = 0;

    const cornerBottomLeft = new BoardTile(0, GameComponent.HEIGHT - BoardTile.CORNER_HEIGHT, 0, fakeTiles[i]);
    layer.add(cornerBottomLeft.root);
    tiles.push(cornerBottomLeft);
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
      tiles.push(tile);
    }

    const cornerLeft = new BoardTile(BoardTile.CORNER_HEIGHT, 0, 90, fakeTiles[i]);
    layer.add(cornerLeft.root);
    tiles.push(cornerLeft);
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
      tiles.push(tile);
    }

    const cornerRight = new BoardTile(GameComponent.HEIGHT, BoardTile.CORNER_WIDTH, 180, fakeTiles[i]);
    layer.add(cornerRight.root);
    tiles.push(cornerRight);
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
      tiles.push(tile);
    }

    const cornerBottomRight = new BoardTile(
      GameComponent.HEIGHT - BoardTile.CORNER_WIDTH,
      GameComponent.WIDTH,
      270,
      fakeTiles[i],
    );
    layer.add(cornerBottomRight.root);
    tiles.push(cornerBottomRight);
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
      tiles.push(tile);
    }

    console.log('end map draw');

    // circle.on('pointerclick', function () {
    //   console.log('Mouseup circle');
    // });

    // player setup
    const currentPlayer = new Player(
      { nickname: 'test', isHost: true },
      new PlayerPin(fakePlayerPins[0]),
      cornerBottomLeft,
      gameStateService,
    );

    stage.add(layer);
    layer.draw();

    gameStateService.setup(
      game,
      currentPlayer,
      tiles,
    );
    contextMenuManager.setup(stage, currentPlayer);
  }

  async ngOnInit(): Promise<void> {
    // TODO: handle join existing game
    this.route.queryParams.subscribe(async (params) => {
      const joinGameId = params['id'];
      if (joinGameId == null) {
        console.error('missing gameId');
        await this.router.navigate(['home']);
        return;
      }

      console.log(`joinGameId: ${joinGameId}`);
      try {
        await this.setupCanvas(joinGameId);
      } catch (err) {
        console.error(`failed game setup: ${err}`);
        await this.router.navigate(['home']);
        return;
      }
    });
  }
}
