import { Component } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatButton } from '@angular/material/button';
import { NgClass } from '@angular/common';
import { GameLogService, GameLogType } from '../services/game-log.service';

@Component({
  selector: 'app-service-log',
  imports: [MatCard, MatProgressBar, MatButton, NgClass],
  templateUrl: './game-log.component.html',
  styleUrl: './game-log.component.scss',
})
export class GameLogComponent {
  constructor(
    protected readonly gameLogService: GameLogService,
  ) {}

  protected readonly GameLogType = GameLogType;
}
