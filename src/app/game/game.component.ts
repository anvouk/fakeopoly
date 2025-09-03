import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import Konva from 'konva';
import { BoardTile, OnTileLeftClick, OnTileRightClick } from './fakeopoly/board-tile';
import { fakePlayerPins, fakeTiles, SpecialType, TileType } from './fakeopoly/fake-data';
import { Player } from './fakeopoly/player';
import { PlayerPin } from './fakeopoly/player-pin';
import gameService from '../services/game.service';
import gameStateService from '../services/game-state.service';
import { MatDialog } from '@angular/material/dialog';
import { RegularTileInfoModalComponent } from './modals/regular-tile-info-modal/regular-tile-info-modal.component';
import { StationsTileInfoModalComponent } from './modals/stations-tile-info-modal/stations-tile-info-modal.component';
import { CompanyTileInfoModalComponent } from './modals/company-tile-info-modal/company-tile-info-modal.component';
import { GameLogService } from '../services/game-log.service';

@Component({
  selector: 'app-game',
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  private static readonly WIDTH = 1220;
  private static readonly HEIGHT = 1220;

  private stage: Konva.Stage | null = null;
  private player: Player | null = null;

  private readonly onTileLeftClick: OnTileLeftClick = (tile) => {
    console.log('on left click on tile:', tile.tileInfo.name);
    switch (tile.tileInfo.type) {
      case TileType.Regular:
        this.dialog.open(RegularTileInfoModalComponent, {
          data: tile.tileInfo,
        });
        break;
      case TileType.Special:
        switch (tile.tileInfo.specialType) {
          case SpecialType.Station:
            this.dialog.open(StationsTileInfoModalComponent, {
              data: tile.tileInfo,
            });
            break;
          case SpecialType.Company:
            this.dialog.open(CompanyTileInfoModalComponent, {
              data: tile.tileInfo,
            });
            break;
          case SpecialType.Probability:
          case SpecialType.Chance:
          case SpecialType.Tax:
          default:
            // there is no context menu for these.
            break;
        }
        break;
      case TileType.Corner:
        // there is no context menu for corner tiles.
        break;
      default:
        console.error('unknown tile type');
        break;
    }
  };

  private readonly onTileRightClick: OnTileRightClick = (tile) => {
    console.log('on right click on tile:', tile.tileInfo.name);
    this.showPopup(tile);
  };

  selectedBoardTile: BoardTile | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly dialog: MatDialog,
    private readonly gameLogService: GameLogService,
  ) {}

  private async setupCanvas(gameId: string) {
    const game = await gameService.getGame(gameId);
    if (game == null) {
      throw new Error(`game does not exist: ${gameId}`);
    }

    this.stage = new Konva.Stage({
      container: 'konva-canvas',
      x: GameComponent.WIDTH / 2,
      y: GameComponent.HEIGHT / 2,
      width: GameComponent.WIDTH,
      height: GameComponent.HEIGHT,
    });

    // register empty right click event simply to prevent default
    // context menu, which is annoying.
    this.stage.on('contextmenu', (e) => {
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

    const cornerBottomLeft = new BoardTile(
      0,
      GameComponent.HEIGHT - BoardTile.CORNER_HEIGHT,
      0,
      fakeTiles[i],
      null,
      (tile) => this.onTileRightClick(tile),
    );
    layer.add(cornerBottomLeft.root);
    tiles.push(cornerBottomLeft);
    ++i;

    // LEFT
    for (; i < fakeTiles.length; ++i) {
      if (fakeTiles[i].type === TileType.Corner) {
        break;
      }
      const tile = new BoardTile(
        BoardTile.HEIGHT,
        GameComponent.HEIGHT - BoardTile.CORNER_HEIGHT - BoardTile.WIDTH - ((i - 1) % 9) * BoardTile.WIDTH,
        90,
        fakeTiles[i],
        (tile) => this.onTileLeftClick(tile),
        (tile) => this.onTileRightClick(tile),
      );
      layer.add(tile.root);
      tiles.push(tile);
    }

    const cornerLeft = new BoardTile(BoardTile.CORNER_HEIGHT, 0, 90, fakeTiles[i], null, (tile) =>
      this.onTileRightClick(tile),
    );
    layer.add(cornerLeft.root);
    tiles.push(cornerLeft);
    ++i;

    // UP
    for (; i < fakeTiles.length; ++i) {
      if (fakeTiles[i].type === TileType.Corner) {
        break;
      }
      const tile = new BoardTile(
        BoardTile.CORNER_WIDTH + BoardTile.WIDTH + ((i - 2) % 9) * BoardTile.WIDTH,
        BoardTile.HEIGHT,
        180,
        fakeTiles[i],
        (tile) => this.onTileLeftClick(tile),
        (tile) => this.onTileRightClick(tile),
      );
      layer.add(tile.root);
      tiles.push(tile);
    }

    const cornerRight = new BoardTile(GameComponent.HEIGHT, BoardTile.CORNER_WIDTH, 180, fakeTiles[i], null, (tile) =>
      this.onTileRightClick(tile),
    );
    layer.add(cornerRight.root);
    tiles.push(cornerRight);
    ++i;

    // RIGHT
    for (; i < fakeTiles.length; ++i) {
      if (fakeTiles[i].type === TileType.Corner) {
        break;
      }
      const tile = new BoardTile(
        GameComponent.WIDTH - BoardTile.HEIGHT,
        BoardTile.CORNER_HEIGHT + BoardTile.WIDTH + ((i - 3) % 9) * BoardTile.WIDTH,
        270,
        fakeTiles[i],
        (tile) => this.onTileLeftClick(tile),
        (tile) => this.onTileRightClick(tile),
      );
      layer.add(tile.root);
      tiles.push(tile);
    }

    const cornerBottomRight = new BoardTile(
      GameComponent.HEIGHT - BoardTile.CORNER_WIDTH,
      GameComponent.WIDTH,
      270,
      fakeTiles[i],
      null,
      (tile) => this.onTileRightClick(tile),
    );
    layer.add(cornerBottomRight.root);
    tiles.push(cornerBottomRight);
    ++i;

    // BOTTOM
    for (; i < fakeTiles.length; ++i) {
      if (fakeTiles[i].type === TileType.Corner) {
        break;
      }
      const tile = new BoardTile(
        GameComponent.WIDTH - BoardTile.CORNER_WIDTH - BoardTile.WIDTH - ((i - 4) % 9) * BoardTile.WIDTH,
        GameComponent.HEIGHT - BoardTile.HEIGHT,
        0,
        fakeTiles[i],
        (tile) => this.onTileLeftClick(tile),
        (tile) => this.onTileRightClick(tile),
      );
      layer.add(tile.root);
      tiles.push(tile);
    }

    console.log('end map draw');

    // player setup
    this.player = new Player(
      { nickname: 'test', isHost: true },
      new PlayerPin(fakePlayerPins[0]),
      cornerBottomLeft,
      gameStateService,
    );

    this.stage.add(layer);
    layer.draw();

    gameStateService.setup(game, this.player, tiles);
  }

  private setupContextMenu() {
    window.addEventListener('click', () => {
      // hide menu
      document.getElementById('context-menu')!.style.display = 'none';
    });

    document.getElementById('teleport-here')!.addEventListener('click', () => {
      if (this.selectedBoardTile == null) {
        return;
      }

      this.player!.teleportToTile(this.selectedBoardTile);
    });

    document.getElementById('move-forward-here')!.addEventListener('click', () => {
      if (this.selectedBoardTile == null) {
        return;
      }

      this.player!.moveForwardToTile(this.selectedBoardTile);
    });

    document.getElementById('move-backward-here')!.addEventListener('click', () => {
      if (this.selectedBoardTile == null) {
        return;
      }

      this.player!.moveBackwardToTile(this.selectedBoardTile);
    });

    document.getElementById('move-next')!.addEventListener('click', () => {
      if (this.selectedBoardTile == null) {
        return;
      }

      this.player!.moveForwardTimes(1);
    });

    document.getElementById('move-prev')!.addEventListener('click', () => {
      if (this.selectedBoardTile == null) {
        return;
      }

      this.player!.moveBackwardTimes(1);
    });

    document.getElementById('handle-turn')!.addEventListener('click', async () => {
      if (this.selectedBoardTile == null) {
        return;
      }

      await gameStateService.turnLoop();
      console.log(`player endend on tile: ${JSON.stringify(this.player!.tile.tileInfo)}`);
      await gameStateService.advanceTurn();
    });
  }

  private showPopup(target: BoardTile) {
    this.selectedBoardTile = target;

    document.getElementById('context-menu')!.style.display = 'initial';
    const containerRect = this.stage!.container().getBoundingClientRect();

    // TODO: fix scaling on higher res displays
    let yPos = containerRect.top + this.stage!.getPointerPosition()!.y + 20 + window.scrollY;
    if (yPos + 300 > window.outerHeight + window.scrollY) {
      yPos -= 180;
    }

    document.getElementById('context-menu')!.style.top = yPos + 'px';
    document.getElementById('context-menu')!.style.left =
      containerRect.left + this.stage!.getPointerPosition()!.x + 20 + 'px';
  }

  private async beginGame() {
    setTimeout(() => {
      this.gameLogService.postNotice({
        title: 'Welcome to fakeopoly',
        msg: 'This is still a work in progress. Please be mindful and have fun :)',
        closeButtonText: 'Got It'
      });
    }, 2000);
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
      this.setupContextMenu();
      try {
        await this.setupCanvas(joinGameId);
      } catch (err) {
        console.error(`failed game setup: ${err}`);
        await this.router.navigate(['home']);
        return;
      }

      try {
        await this.beginGame();
      } catch (err) {
        console.error(`failed beginning game: ${err}`);
      }
    });
  }
}
