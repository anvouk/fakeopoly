import { Query } from '@datorama/akita';
import { PlayerState, PlayerStore } from './player.store';

export class PlayerQuery extends Query<PlayerState> {
  constructor(protected store: PlayerStore) {
    super(store);
  }

  isLoggedIn$ = this.select(store => store.token != '');
  isInGame$ = this.select(store => store.gameId != '');

  token$ = this.select('token');
  gameId$ = this.select('gameId');
  playerInfo$ = this.select('info');
}
