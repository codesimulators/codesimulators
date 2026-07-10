import { GameStatus } from './GameStatus';
import { Position } from './Position';
import { Piece } from './Piece';
import { Player } from './Player';
import { Move } from './Move';

export class TicTacToeEngine {
    private grid: (Piece | null)[][];
    private currentPlayerIndex = 0;
    private status = GameStatus.NOT_STARTED;
    private moveHistory: Move[] = [];
    private winner: Player | null = null;

    readonly players: Player[] = [
        { name: 'Player 1', piece: { symbol: 'X', color: '#818CF8' } },
        { name: 'Player 2', piece: { symbol: 'O', color: '#F59E0B' } },
    ];
    readonly size: number;

    constructor(size: number = 3) {
        this.size = size;
        this.grid = Array.from({ length: size }, () =>
            Array.from({ length: size }, () => null)
        );
    }

    start(): void {
        this.status = GameStatus.IN_PROGRESS;
        this.currentPlayerIndex = 0;
        this.moveHistory = [];
        this.winner = null;
        this.grid = Array.from({ length: this.size }, () =>
            Array.from({ length: this.size }, () => null)
        );
    }

    getGrid(): (Piece | null)[][] {
        return this.grid.map(row => [...row]);
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

    makeMove(player: Player, to: Position): boolean {
        if (this.status !== GameStatus.IN_PROGRESS) return false;
        if (to.row < 0 || to.row >= this.size ||
            to.col < 0 || to.col >= this.size) return false;
        if (this.grid[to.row][to.col] !== null) return false;
        if (player !== this.players[this.currentPlayerIndex]) return false;

        this.grid[to.row][to.col] = player.piece;
        this.moveHistory.push({ player, to });

        if (this.checkWin(to)) {
            this.status = GameStatus.COMPLETED;
            this.winner = player;
            return true;
        }

        if (this.grid.every(row => row.every(c => c !== null))) {
            this.status = GameStatus.DRAW;
            return true;
        }

        this.currentPlayerIndex =
            (this.currentPlayerIndex + 1) % this.players.length;
        return true;
    }

    private checkWin(pos: Position): boolean {
        const piece = this.grid[pos.row][pos.col];
        if (!piece) return false;

        const dirs = [[0, 1], [1, 0], [1, 1], [1, -1]];
        for (const [dr, dc] of dirs) {
            let count = 1;
            for (const dir of [-1, 1]) {
                for (let i = 1; i < this.size; i++) {
                    const r = pos.row + dr * i * dir;
                    const c = pos.col + dc * i * dir;
                    if (r < 0 || r >= this.size ||
                        c < 0 || c >= this.size) break;
                    const cell = this.grid[r][c];
                    if (cell?.symbol === piece.symbol) count++;
                    else break;
                }
            }
            if (count >= this.size) return true;
        }
        return false;
    }
}