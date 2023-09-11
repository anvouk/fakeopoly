import Konva from 'konva';
import { TileCornerInfo, TileInfo, TileRegularInfo, TileSpecialInfo } from './fake-data';
import ContextMenuManager from './context-menu-manager';

export class BoardTile {
  public static readonly WIDTH: number = 100;
  public static readonly HEIGHT: number = 160;

  public static readonly CORNER_WIDTH: number = 160;
  public static readonly CORNER_HEIGHT: number = 160;

  private readonly _root: Konva.Group;
  private readonly _tileInfo: TileInfo;

  public get root(): Konva.Group {
    return this._root;
  }

  public get tileInfo(): TileInfo {
    return this._tileInfo;
  }

  private constructRegularTile(tileInfo: TileRegularInfo) {
    const banner = new Konva.Rect({
      width: BoardTile.WIDTH,
      height: 30,
      fill: tileInfo.regularData.color,
      stroke: 'black',
      strokeWidth: 2,
    });
    this._root.add(banner);

    const text = new Konva.Text({
      text: tileInfo.name.replaceAll(' ', '\n'),
      x: BoardTile.WIDTH / 2 - BoardTile.WIDTH / 3,
      y: BoardTile.HEIGHT / 3,
      fontSize: 16,
      fontFamily: 'Calibri',
      align: 'center',
      fill: '#000000',
    });
    this._root.add(text);
  }

  private constructSpecialTile(tileInfo: TileSpecialInfo) {
    const img = new Image(tileInfo.specialData.width, tileInfo.specialData.height);
    img.src = tileInfo.specialData.imageUrl;

    const backgroundImage = new Konva.Image({
      x: BoardTile.WIDTH / 2 - BoardTile.WIDTH / 3,
      y: BoardTile.HEIGHT - tileInfo.specialData.height - 20,
      width: tileInfo.specialData.width,
      height: tileInfo.specialData.height,
      image: img,
    });
    this._root.add(backgroundImage);

    const text = new Konva.Text({
      text: tileInfo.name.replaceAll(' ', '\n'),
      x: BoardTile.WIDTH / 2 - BoardTile.WIDTH / 3,
      y: 20,
      fontSize: 16,
      fontFamily: 'Calibri',
      align: 'center',
      fill: '#000000',
    });
    this._root.add(text);
  }

  private constructCornerTile(tileInfo: TileCornerInfo) {
    const img = new Image(BoardTile.CORNER_WIDTH, BoardTile.CORNER_HEIGHT);
    img.src = tileInfo.cornerData.imageUrl;

    const backgroundImage = new Konva.Image({
      width: BoardTile.CORNER_WIDTH,
      height: BoardTile.CORNER_HEIGHT,
      image: img,
    });
    this._root.add(backgroundImage);
  }

  constructor(x: number, y: number, rot: number, tileInfo: TileInfo) {
    this._tileInfo = tileInfo;

    let width = BoardTile.WIDTH;
    let height = BoardTile.HEIGHT;
    if (tileInfo.type === 'corner') {
      width = BoardTile.CORNER_WIDTH;
      height = BoardTile.CORNER_HEIGHT;
    }

    this._root = new Konva.Group({
      x: x,
      y: y,
      rotation: rot,
      width: width,
      height: height,
    });
    this._root.on('contextmenu', (e) => {
      e.evt.preventDefault();
      ContextMenuManager.showPopup(this);
    });

    // tile hover overlay setup
    if (tileInfo.type !== 'corner') {
      const backgroundHover = new Konva.Rect({
        width: width,
        height: height,
        stroke: '#000000',
        strokeWidth: 2,
        fill: '#ffffff',
        opacity: 0.15,
      });
      this._root.add(backgroundHover);

      this._root.on('mouseenter', (e) => {
        document.body.style.cursor = 'pointer';
        backgroundHover.setZIndex(3);
      });
      this._root.on('mouseleave', (e) => {
        document.body.style.cursor = 'default';
        backgroundHover.setZIndex(0);
      });
    }

    const background = new Konva.Rect({
      width: width,
      height: height,
      fill: '#75905b',
      stroke: '#000000',
      strokeWidth: 2,
    });
    this._root.add(background);

    switch (tileInfo.type) {
      case 'regular':
        this.constructRegularTile(tileInfo);
        break;
      case 'special':
        this.constructSpecialTile(tileInfo);
        break;
      case 'corner':
        this.constructCornerTile(tileInfo);
        break;
    }
  }
}
