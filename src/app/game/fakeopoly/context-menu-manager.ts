import Konva from 'konva';
import { BoardTile } from './board-tile';
import { Player } from "./player";
import gameStateService from "../../services/game-state.service";

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

    document.getElementById('move-prev')!.addEventListener('click', () => {
      if (this._target == null) {
        return;
      }

      this._player!.moveToNextTile();
    });

    document.getElementById('move-next')!.addEventListener('click', () => {
      if (this._target == null) {
        return;
      }

      this._player!.moveToPrevTile();
    });

    document.getElementById('handle-turn')!.addEventListener('click', async () => {
      if (this._target == null) {
        return;
      }

      await gameStateService.turnLoop(() => {
        console.log(`player endend on tile: ${JSON.stringify(this._player!.tile.tileInfo)}`);
      });
    });
  }

  public showPopup(target: BoardTile) {
    this._target = target;
    this._menuNode!.style.display = 'initial';
    const containerRect = this._stage!.container().getBoundingClientRect();

    // TODO: fix scaling on higher res displays
    let yPos = containerRect.top + this._stage!.getPointerPosition()!.y + 20 + window.scrollY;
    if (yPos + 300 > (window.outerHeight + window.scrollY)) {
      yPos -= 180;
    }

    this._menuNode!.style.top = yPos + 'px';
    this._menuNode!.style.left = containerRect.left + this._stage!.getPointerPosition()!.x + 20 + 'px';
  }
}

export default new ContextMenuManager();
