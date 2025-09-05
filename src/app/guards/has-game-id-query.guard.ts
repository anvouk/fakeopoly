import { CanActivateFn } from '@angular/router';

export const hasGameIdQueryGuard: CanActivateFn = (route, state) => {
  const gameId = route.queryParamMap.get('id');
  return gameId != null;
};
