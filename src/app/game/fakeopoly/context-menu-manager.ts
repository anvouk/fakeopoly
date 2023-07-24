import Konva from 'konva';
import { BoardTile } from './board-tile';
import { Player } from "./player";

export class ContextMenuManager {
  private _stage: Konva.Stage | null = null;
  private _player: Player | null = null;
  private _menuNode: HTMLElement | null = null;

  private _target: BoardTile | null = null;

  public setup(stage: Konva.Stage, player: Player) {
    this._player = player;
    this._menuNode = document.getElementById('context-menu')!;
    window.addEventListener('click', () => {
      // hide menu
      this._menuNode!.style.display = 'none';
    });
    this._stage = stage;

    document.getElementById('show-info')!.addEventListener('click', () => {
      if (this._target == null) {
        return;
      }

      console.log(JSON.stringify(this._target.tileInfo));
    });

    document.getElementById('move-here')!.addEventListener('click', () => {
      if (this._target == null) {
        return;
      }

      this._player!.moveToTile(this._target);
    });
  }

  public showPopup(target: BoardTile) {
    this._target = target;
    this._menuNode!.style.display = 'initial';
    const containerRect = this._stage!.container().getBoundingClientRect();
    this._menuNode!.style.top = containerRect.top + this._stage!.getPointerPosition()!.y + 20 + 'px';
    this._menuNode!.style.left = containerRect.left + this._stage!.getPointerPosition()!.x + 20 + 'px';
  }
}

export default new ContextMenuManager();
