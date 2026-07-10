import { Player } from './Player';
import { Position } from './Position';

export interface Move {
    player: Player;
    from: Position;
    to: Position;
}