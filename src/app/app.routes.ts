import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
  { path: 'game', loadComponent: () => import('./game/game.component').then(m => m.GameComponent) },
  { path: '**', loadComponent: () => import('./page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent) },
];
