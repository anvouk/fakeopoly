import { Component } from '@angular/core';
import { GameLogComponent } from './game-log/game-log.component';
import { GameBarComponent } from './game-bar/game-bar.component';

@Component({
  selector: 'app-hud',
  imports: [GameLogComponent, GameBarComponent],
  templateUrl: './hud.component.html',
  styleUrl: './hud.component.scss',
})
export class HudComponent {}
