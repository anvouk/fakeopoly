import { PlayerInfo } from '../services/player.service';
import { Store, StoreConfig } from '@datorama/akita';

export interface PlayerState {
  info: PlayerInfo | null;
  token: string;
  gameId: string;
}

@StoreConfig({ name: 'player' })
export class PlayerStore extends Store<PlayerState> {
  constructor() {
    super({
      info: null,
      token: '',
      gameId: '',
    });
  }
}
