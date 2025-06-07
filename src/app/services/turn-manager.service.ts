import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TurnManagerService {
  private readonly _currentTurn: WritableSignal<number> = signal(1);

  public get currentTurn() {
    return this._currentTurn.asReadonly();
  }

  public advanceToTurn(turn: number) {
    this._currentTurn.update(_ => turn);
  }
}
