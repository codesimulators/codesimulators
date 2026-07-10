import { GameStatus } from './GameStatus';
import { Player } from './Player';
import { SnakeLadderMove } from './SnakeLadderMove';
import { SnakeLadderConfig, DEFAULT_CONFIG } from './SnakeLadderConfig';

const TOKEN_PIECES = [
    { symbol: '🔴', color: '#EF4444' },
    { symbol: '🔵', color: '#3B82F6' },
    { symbol: '🟢', color: '#10B981' },
    { symbol: '🟡', color: '#F59E0B' },
];

export class SnakeLadderEngine {
    private players: Player[];
    private config: SnakeLadderConfig;
    private positions: Map<string, number> = new Map();
    private currentPlayerIndex = 0;
    private status = GameStatus.NOT_STARTED;
    private moveHistory: SnakeLadderMove[] = [];
    private winner: Player | null = null;

    constructor(
        players: Player[] = [
            { name: 'Player 1', piece: TOKEN_PIECES[0] },
            { name: 'Player 2', piece: TOKEN_PIECES[1] },
        ],
        config: SnakeLadderConfig = DEFAULT_CONFIG,
    ) {
        this.players = players;
        this.config = config;
    }

    start(): void {
        this.status = GameStatus.IN_PROGRESS;
        this.currentPlayerIndex = 0;
        this.moveHistory = [];
        this.winner = null;
        this.positions = new Map();
        for (const p of this.players) {
            this.positions.set(p.name, 0);
        }
    }

    rollDice(): number {
        return Math.floor(Math.random() * 6) + 1;
    }

    makeMove(player: Player, diceValue: number): { success: boolean; error?: string; move?: SnakeLadderMove } {
        if (this.status !== GameStatus.IN_PROGRESS) {
            return { success: false, error: 'Game not in progress' };
        }

        const currentPos = this.positions.get(player.name) || 0;
        let newPos = currentPos + diceValue;

        if (newPos > this.config.finish) {
            newPos = currentPos;
            const move: SnakeLadderMove = { player, diceValue, fromCell: currentPos, toCell: newPos };
            this.moveHistory.push(move);
            this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
            return { success: true, move };
        }

        let landedOnSnake = false;
        let landedOnLadder = false;

        if (this.config.snakes[newPos]) {
            newPos = this.config.snakes[newPos];
            landedOnSnake = true;
        } else if (this.config.ladders[newPos]) {
            newPos = this.config.ladders[newPos];
            landedOnLadder = true;
        }

        this.positions.set(player.name, newPos);
        const move: SnakeLadderMove = { player, diceValue, fromCell: currentPos, toCell: newPos, landedOnSnake, landedOnLadder };
        this.moveHistory.push(move);

        if (newPos === this.config.finish) {
            this.status = GameStatus.COMPLETED;
            this.winner = player;
        } else {
            this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
        }

        return { success: true, move };
    }

    getPosition(player: Player): number {
        return this.positions.get(player.name) || 0;
    }

    getCurrentPlayer(): Player {
        return this.players[this.currentPlayerIndex];
    }

    getStatus(): GameStatus {
        return this.status;
    }

    getWinner(): Player | null {
        return this.winner;
    }

    getBoardCells(): { cell: number; players: Player[]; snake?: number; ladder?: number }[] {
        const cells: { cell: number; players: Player[]; snake?: number; ladder?: number }[] = [];
        for (let i = 1; i <= this.config.finish; i++) {
            const occupying: Player[] = [];
            for (const p of this.players) {
                if (this.positions.get(p.name) === i) {
                    occupying.push(p);
                }
            }
            const entry: { cell: number; players: Player[]; snake?: number; ladder?: number } = {
                cell: i,
                players: occupying,
            };
            if (this.config.snakes[i]) entry.snake = this.config.snakes[i];
            if (this.config.ladders[i]) entry.ladder = this.config.ladders[i];
            cells.push(entry);
        }
        return cells;
    }
}