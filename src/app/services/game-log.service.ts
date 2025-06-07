import { Injectable, signal, WritableSignal } from '@angular/core';
import { nanoid } from 'nanoid';

export enum GameLogType {
  Notice = 'Notice',
  Interaction = 'Interaction',
}

export interface GameLog {
  title?: string | null;
  message: string;
}

export interface GameLogNotice extends GameLog {
  logType: GameLogType.Notice;
  displayData: {
    closeButtonText: string;
  }
}

export interface GameLogInteraction extends GameLog {
  logType: GameLogType.Interaction;
  displayData: {
    closeButtonText: string;
    interactButtonText: string;
  }
}

export type GameLogContentType = GameLogNotice | GameLogInteraction;

export interface GameLogNotification {
  id: string;
  content: GameLogContentType;
  expiry?: {
    progressBarVal: WritableSignal<number>,
    progressBarDecrementRate: number,
    remainingMillis: number,
  }
}

@Injectable({
  providedIn: 'root'
})
export class GameLogService {
  private readonly _messages: WritableSignal<GameLogNotification[]> = signal([]);

  public get messages() {
    return this._messages.asReadonly();
  }

  private expireLogTimer(entry: GameLogNotification) {
    setTimeout(() => {
      entry.expiry!.remainingMillis -= 100;
      // console.log('remaining secs:', entry.expiry!.remainingMillis / 1000);
      entry.expiry!.progressBarVal.update((value) => value - entry.expiry!.progressBarDecrementRate);
      if (entry.expiry!.remainingMillis > 0) {
        this.expireLogTimer(entry);
      } else {
        this.closeNotification(entry);
      }
    }, 100);
  }

  private postLog(log: GameLogContentType, expirySecs: number | null = null) {
    const entry: GameLogNotification = {
      id: nanoid(8),
      content: log,
    };
    if (expirySecs != null) {
      const dec = 100 / expirySecs;
      entry.expiry = {
        progressBarVal: signal(100),
        progressBarDecrementRate: dec / 10,
        remainingMillis: expirySecs * 1000,
      };
    }
    this._messages.update(array => [...array, entry]);
    if (expirySecs != null) {
      this.expireLogTimer(entry);
    }
  }

  public postNotice(payload: {title?: string, msg: string, expirySecs?: number, closeButtonText?: string, interactButtonText?: string}) {
    this.postLog({
      title: payload.title,
      message: payload.msg,
      logType: GameLogType.Notice,
      displayData: {
        closeButtonText: payload.closeButtonText ?? 'Close',
      }
    }, payload.expirySecs);
  }

  public postInteraction(payload: {title?: string, msg: string, expirySecs?: number, closeButtonText?: string, interactButtonText?: string}) {
    this.postLog({
      title: payload.title,
      message: payload.msg,
      logType: GameLogType.Interaction,
      displayData: {
        closeButtonText: payload.closeButtonText ?? 'Ignore',
        interactButtonText: payload.interactButtonText ?? 'Let\'s see',
      }
    }, payload.expirySecs);
  }

  public closeNotification(notification: GameLogNotification) {
    if (notification.expiry != null) {
      notification.expiry.remainingMillis = 0;
    }
    this._messages.update(array => {
      array.splice(array.indexOf(notification), 1);
      return [...array];
    });
  }
}
