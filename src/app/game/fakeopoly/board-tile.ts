import Konva from 'konva';
import { TileCornerInfo, TileInfo, TileRegularInfo, TileSpecialInfo, TileType } from './fake-data';

export type OnTileLeftClick = (tile: BoardTile) => void;
export type OnTileRightClick = (tile: BoardTile) => void;

export class BoardTile {
  public static readonly WIDTH: number = 100;
  public static readonly HEIGHT: number = 160;

  public static readonly CORNER_WIDTH: number = 160;
  public static readonly CORNER_HEIGHT: number = 160;

  public static readonly HOUSE_WIDTH: number = 20;
  public static readonly HOUSE_HEIGHT: number = 20;

  private readonly _root: Konva.Group;
  private readonly _tileInfo: TileInfo;

  private _houses: number = 0;
  private _housesImages: Konva.Image[] = [];

  public get root(): Konva.Group {
    return this._root;
  }

  public get tileInfo(): TileInfo {
    return this._tileInfo;
  }

  public get houses() {
    return this._houses;
  }

  public get maxHouses() {
    return this._housesImages.length;
  }

  public set houses(value: number) {
    if (value < 0 || value > this.maxHouses) {
      return;
    }
    for (let i = 0; i < this.maxHouses; i++) {
      if (value <= i) {
        this._housesImages[i].hide();
      } else {
        this._housesImages[i].show();
      }
    }
    this._houses = value;
  }

  private constructRegularTile(tileInfo: TileRegularInfo) {
    const banner = new Konva.Rect({
      width: BoardTile.WIDTH,
      height: 30,
      fill: tileInfo.group?.color,
      stroke: 'black',
      strokeWidth: 2,
    });
    this._root.add(banner);

    for (let i = 0; i < tileInfo.regularData.rents.length - 1; i++) {
      const img = new Image(BoardTile.HOUSE_WIDTH, BoardTile.HOUSE_HEIGHT);
      img.src = tileInfo.regularData.houseImageUrl;

      const house = new Konva.Image({
        x: i * 4 * (BoardTile.WIDTH / BoardTile.HOUSE_WIDTH),
        y: 5,
        width: BoardTile.HOUSE_WIDTH,
        height: BoardTile.HOUSE_HEIGHT,
        image: img,
      });
      house.hide();
      this._housesImages.push(house)
      this._root.add(house);
    }

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
      x: BoardTile.WIDTH / 10,
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

  constructor(x: number, y: number, rot: number, tileInfo: TileInfo,
              onLeftClick: OnTileLeftClick | null = null,
              onRightClick: OnTileRightClick | null = null) {
    this._tileInfo = tileInfo;

    let width = BoardTile.WIDTH;
    let height = BoardTile.HEIGHT;
    if (tileInfo.type === TileType.Corner) {
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

    if (tileInfo.leftClickable && onLeftClick != null) {
      this._root.on('mouseup', (e) => {
        // only on left click
        if (e.evt.button === 0) {
          e.evt.preventDefault();
          onLeftClick(this);
        }
      });
    }
    if (onRightClick != null) {
      this._root.on('contextmenu', (e) => {
        e.evt.preventDefault();
        onRightClick(this);
      });
    }

    // tile hover overlay setup for clickable tiles only
    if (tileInfo.leftClickable && onLeftClick != null) {
      const backgroundHover = new Konva.Rect({
        width: width,
        height: height,
        stroke: '#000000',
        strokeWidth: 2,
        fill: 'rgba(255,255,255,0.2)',
      });
      this._root.add(backgroundHover);

      this._root.on('mouseenter', (_) => {
        document.body.style.cursor = 'pointer';
        backgroundHover.setZIndex(2);
      });
      this._root.on('mouseleave', (_) => {
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
      case TileType.Regular:
        this.constructRegularTile(tileInfo);
        break;
      case TileType.Special:
        this.constructSpecialTile(tileInfo);
        break;
      case TileType.Corner:
        this.constructCornerTile(tileInfo);
        break;
    }
  }
}
