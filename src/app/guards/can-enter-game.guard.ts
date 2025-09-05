import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import pouchserverService from '../services/pouchserver.service';

export const canEnterGameGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);

  const gameId = route.queryParamMap.get('id') || sessionStorage.getItem('gameId');
  if (gameId == null) {
    return false;
  }

  const game = await pouchserverService.getGame(gameId);
  if (game == null) {
    await router.navigate(['/game-not-found'], {
      queryParams: {
        id: gameId,
      }
    });
    return false;
  }

  return true;
};
