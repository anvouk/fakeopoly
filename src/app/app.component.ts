import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GameLogComponent } from './game-log/game-log.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterModule, GameLogComponent],
  providers: [],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
