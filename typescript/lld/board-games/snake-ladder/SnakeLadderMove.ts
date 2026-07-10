import { Player } from './Player';

// A record of one turn — also the replay/undo log entry.
export interface SnakeLadderMove {
    player: Player;
    diceValue: number;
    fromCell: number;
    toCell: number;
    landedOnSnake?: boolean;
    landedOnLadder?: boolean;
}