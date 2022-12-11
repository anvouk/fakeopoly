import Konva from 'konva';
import { TileInfo, TileRegularInfo, TileSpecialInfo } from './fake-data';
import ContextMenuManager from './context-menu-manager';

export class FakeTile {
  public static readonly WIDTH: number = 100;
  public static readonly HEIGHT: number = 160;

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
      width: FakeTile.WIDTH,
      height: 30,
      fill: tileInfo.regularData.color,
      stroke: 'black',
      strokeWidth: 2,
    });
    this._root.add(banner);

    const text = new Konva.Text({
      text: tileInfo.name.replaceAll(' ', '\n'),
      x: (FakeTile.WIDTH / 2) - (FakeTile.WIDTH / 3),
      y: (FakeTile.HEIGHT / 3),
      fontSize: 16,
      fontFamily: 'Calibri',
      align: 'center',
      fill: '#000000',
    })
    this._root.add(text);
  }

  private constructSpecialTile(tileInfo: TileSpecialInfo) {
    const img = new Image(tileInfo.specialData.width, tileInfo.specialData.height);
    img.src = tileInfo.specialData.imageUrl;

    const backgroundImage = new Konva.Image({
      x: (FakeTile.WIDTH / 2) - (FakeTile.WIDTH / 3),
      y: FakeTile.HEIGHT - tileInfo.specialData.height - 20,
      width: tileInfo.specialData.width,
      height: tileInfo.specialData.height,
      image: img,
    });
    this._root.add(backgroundImage);

    const text = new Konva.Text({
      text: tileInfo.name.replaceAll(' ', '\n'),
      x: (FakeTile.WIDTH / 2) - (FakeTile.WIDTH / 3),
      y: 20,
      fontSize: 16,
      fontFamily: 'Calibri',
      align: 'center',
      fill: '#000000',
    })
    this._root.add(text);
  }

  constructor(x: number, y: number, rot: number, tileInfo: TileInfo) {
    this._tileInfo = tileInfo;
    this._root = new Konva.Group({
      x: x,
      y: y,
      rotation: rot,
      width: FakeTile.WIDTH,
      height: FakeTile.HEIGHT,
    });

    this._root.on('contextmenu', (e) => {
      e.evt.preventDefault();
      ContextMenuManager.showPopup(this);
    })

    const background = new Konva.Rect({
      width: FakeTile.WIDTH,
      height: FakeTile.HEIGHT,
      stroke: '#000000',
      strokeWidth: 2,
    });
    this._root.add(background);

    switch (tileInfo.type) {
      case 'regular':
        this.constructRegularTile(tileInfo);
        break;
      case 'special':
        this.constructSpecialTile(tileInfo)
        break;
    }
  }
}
