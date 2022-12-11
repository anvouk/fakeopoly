import Konva from 'konva';
import { CornerTileInfo } from './fake-data';

export class CornerTile {
  public static readonly WIDTH: number = 160;
  public static readonly HEIGHT: number = 160;

  private readonly _root: Konva.Group;

  get root(): Konva.Group {
    return this._root;
  }

  constructor(x: number, y: number, rot: number, tileInfo: CornerTileInfo) {
    this._root = new Konva.Group({
      x: x,
      y: y,
      rotation: rot,
      width: CornerTile.WIDTH,
      height: CornerTile.HEIGHT,
    });

    const background = new Konva.Rect({
      width: CornerTile.WIDTH,
      height: CornerTile.HEIGHT,
      stroke: '#000000',
      strokeWidth: 2,
    });
    this._root.add(background);

    const img = new Image(CornerTile.WIDTH, CornerTile.HEIGHT);
    img.src = tileInfo.imageUrl;

    const backgroundImage = new Konva.Image({
      width: CornerTile.WIDTH,
      height: CornerTile.HEIGHT,
      image: img,
    });
    this._root.add(backgroundImage);
  }
}
