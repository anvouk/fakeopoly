import Konva from 'konva';
import { TileInfo } from './fake-data';

export class FakeTile {
  public static readonly WIDTH: number = 100;
  public static readonly HEIGHT: number = 160;

  private readonly _root: Konva.Group;
  private readonly _tileInfo: TileInfo;

  get root(): Konva.Group {
    return this._root;
  }

  constructor(x: number, y: number, tileInfo: TileInfo) {
    this._tileInfo = tileInfo;
    this._root = new Konva.Group({
      x: x,
      y: y,
      width: FakeTile.WIDTH,
      height: FakeTile.HEIGHT,
    });

    const background = new Konva.Rect({
      width: FakeTile.WIDTH,
      height: FakeTile.HEIGHT,
      stroke: '#000000',
      strokeWidth: 2,
    });
    this._root.add(background);

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

    const banner = new Konva.Rect({
      width: FakeTile.WIDTH,
      height: 30,
      fill: tileInfo.color,
      stroke: 'black',
      strokeWidth: 2,
    });
    this._root.add(banner);
  }
}
