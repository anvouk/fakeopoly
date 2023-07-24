import { PlayerPinInfo } from './fake-data';
import Konva from 'konva';

export class PlayerPin {
  public static readonly WIDTH: number = 64;
  public static readonly HEIGHT: number = 64;

  private readonly _root: Konva.Group;

  public get root(): Konva.Group {
    return this._root;
  }

  public constructor(x: number, y: number, pinInfo: PlayerPinInfo) {
    this._root = new Konva.Group({
      x: x,
      y: y,
      width: PlayerPin.WIDTH,
      height: PlayerPin.HEIGHT,
    });

    const img = new Image(PlayerPin.WIDTH, PlayerPin.HEIGHT);
    img.src = pinInfo.imageUrl;

    const pinImage = new Konva.Image({
      width: PlayerPin.WIDTH,
      height: PlayerPin.HEIGHT,
      image: img,
    });
    this._root.add(pinImage);
  }
}
