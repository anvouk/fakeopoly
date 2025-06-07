import { Component, signal, WritableSignal } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatButton } from '@angular/material/button';
import { NgClass } from '@angular/common';
import { nanoid } from 'nanoid';

export enum ServiceLogType {
  Info = 'Info',
  Interaction = 'Interaction',
}

export interface ServiceLog {
  message: string;
  logType: ServiceLogType;
}

interface Notification {
  id: string;
  content: ServiceLog;
  expiry?: {
    progressBarVal: WritableSignal<number>,
    progressBarDecrementRate: number,
    remainingMillis: number,
  }
}

@Component({
  selector: 'app-service-log',
  imports: [MatCard, MatProgressBar, MatButton, NgClass],
  templateUrl: './service-log.component.html',
  styleUrl: './service-log.component.scss',
})
export class ServiceLogComponent {
  _messages: Notification[] = [];

  private expireLogTimer(entry: Notification) {
    setTimeout(() => {
      entry.expiry!.remainingMillis -= 100;
      // console.log('remaining secs:', entry.expiry!.remainingMillis / 1000);
      entry.expiry!.progressBarVal.update((value) => value - entry.expiry!.progressBarDecrementRate);
      if (entry.expiry!.remainingMillis > 0) {
        this.expireLogTimer(entry);
      } else {
        this._messages.splice(this._messages.indexOf(entry), 1);
      }
    }, 100);
  }

  public publishMessage(msg: string, expirySecs: number | null = null) {
    const entry: Notification = {
      id: nanoid(8),
      content: {
        message: msg,
        logType: ServiceLogType.Info,
      },
    };
    if (expirySecs != null) {
      const dec = 100 / expirySecs;
      entry.expiry = {
        progressBarVal: signal(100),
        progressBarDecrementRate: dec / 10,
        remainingMillis: expirySecs * 1000,
      };
    }
    this._messages.push(entry);
    if (expirySecs != null) {
      this.expireLogTimer(entry);
    }
  }

  protected readonly ServiceLogType = ServiceLogType;
}
