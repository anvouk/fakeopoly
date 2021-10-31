import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { RouterModule, Routes } from '@angular/router';
import { InvalidComponent } from './invalid/invalid.component';
import { JoinGameComponent } from './join-game/join-game.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'invalid', component: InvalidComponent },
  { path: ':gameId', component: GameComponent },
];

@NgModule({
  declarations: [
    GameComponent,
    InvalidComponent,
    JoinGameComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
  ]
})
export class GameModule { }
