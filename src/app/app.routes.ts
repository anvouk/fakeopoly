import { Routes } from '@angular/router';
import { canEnterGameGuard } from './guards/can-enter-game.guard';
import { hasGameIdQueryGuard } from './guards/has-game-id-query.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./home/home.component').then((m) => m.HomeComponent) },
  {
    path: 'game',
    loadComponent: () => import('./game/game.component').then((m) => m.GameComponent),
    canActivate: [canEnterGameGuard],
  },
  {
    path: 'game-not-found',
    loadComponent: () => import('./game-not-found/game-not-found.component').then((m) => m.GameNotFoundComponent),
    canActivate: [hasGameIdQueryGuard],
  },
  {
    path: '**',
    loadComponent: () => import('./page-not-found/page-not-found.component').then((m) => m.PageNotFoundComponent),
  },
];
