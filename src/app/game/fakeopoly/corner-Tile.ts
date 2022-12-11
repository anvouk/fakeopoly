import Konva from 'konva';

export class CornerTile {
  public static readonly WIDTH: number = 160;
  public static readonly HEIGHT: number = 160;

  private readonly _root: Konva.Group;

  get root(): Konva.Group {
    return this._root;
  }

  constructor(x: number, y: number) {
    this._root = new Konva.Group({
      x: x,
      y: y,
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
  }
}
