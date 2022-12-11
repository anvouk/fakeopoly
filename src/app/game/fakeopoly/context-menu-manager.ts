import Konva from 'konva';
import { FakeTile } from './fake-tile';

export class ContextMenuManager {
  private _stage: Konva.Stage | null = null;
  private _menuNode: HTMLElement | null = null;

  private _target: FakeTile | null = null;

  public setup(stage: Konva.Stage) {
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
  }

  public showPopup(target: FakeTile) {
    this._target = target;
    this._menuNode!.style.display = 'initial';
    const containerRect = this._stage!.container().getBoundingClientRect();
    this._menuNode!.style.top = containerRect.top + this._stage!.getPointerPosition()!.y + 20 + 'px';
    this._menuNode!.style.left = containerRect.left + this._stage!.getPointerPosition()!.x + 20 + 'px';
  }
}

export default new ContextMenuManager();
