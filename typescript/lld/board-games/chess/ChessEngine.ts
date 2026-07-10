import { GameStatus } from './GameStatus';
import { PieceType } from './PieceType';
import { Position } from './Position';
import { Piece } from './Piece';
import { Player } from './Player';
import { Move } from './Move';

export class ChessEngine {
    readonly players: Player[];
    private grid: (Piece | null)[][];
    private currentPlayerIndex = 0;
    private status = GameStatus.NOT_STARTED;
    private moveHistory: Move[] = [];
    private winner: Player | null = null;

    constructor() {
        this.players = [
            { name: 'White', piece: { symbol: '♔', color: '#FFFFFF', type: PieceType.KING } },
            { name: 'Black', piece: { symbol: '♚', color: '#000000', type: PieceType.KING } },
        ];
        this.grid = Array.from({ length: 8 }, () =>
            Array.from({ length: 8 }, () => null));
    }

    start(): void {
        this.status = GameStatus.IN_PROGRESS;
        this.currentPlayerIndex = 0;
        this.moveHistory = [];
        this.winner = null;
        this.grid = Array.from({ length: 8 }, () =>
            Array.from({ length: 8 }, () => null));
        this.setupBoard();
    }

    private setupBoard(): void {
        const backRank: PieceType[] = [
            PieceType.ROOK, PieceType.KNIGHT, PieceType.BISHOP,
            PieceType.QUEEN, PieceType.KING, PieceType.BISHOP,
            PieceType.KNIGHT, PieceType.ROOK,
        ];
        const wSym: Record<PieceType, string> = {
            [PieceType.KING]: '♔', [PieceType.QUEEN]: '♕',
            [PieceType.ROOK]: '♖', [PieceType.BISHOP]: '♗',
            [PieceType.KNIGHT]: '♘', [PieceType.PAWN]: '♙',
        };
        const bSym: Record<PieceType, string> = {
            [PieceType.KING]: '♚', [PieceType.QUEEN]: '♛',
            [PieceType.ROOK]: '♜', [PieceType.BISHOP]: '♝',
            [PieceType.KNIGHT]: '♞', [PieceType.PAWN]: '♟',
        };
        for (let c = 0; c < 8; c++) {
            this.grid[0][c] = { symbol: bSym[backRank[c]], color: '#000000', type: backRank[c] };
            this.grid[1][c] = { symbol: bSym[PieceType.PAWN], color: '#000000', type: PieceType.PAWN };
            this.grid[6][c] = { symbol: wSym[PieceType.PAWN], color: '#FFFFFF', type: PieceType.PAWN };
            this.grid[7][c] = { symbol: wSym[backRank[c]], color: '#FFFFFF', type: backRank[c] };
        }
    }

    getGrid(): (Piece | null)[][] {
        return this.grid.map(row => [...row]);
    }

    getCurrentPlayer(): Player { return this.players[this.currentPlayerIndex]; }
    getStatus(): GameStatus { return this.status; }
    getWinner(): Player | null { return this.winner; }

    makeMove(from: Position, to: Position): boolean {
        if (this.status !== GameStatus.IN_PROGRESS) return false;
        if (from.row < 0 || from.row >= 8 || from.col < 0 || from.col >= 8) return false;
        if (to.row < 0 || to.row >= 8 || to.col < 0 || to.col >= 8) return false;

        const piece = this.grid[from.row][from.col];
        if (!piece) return false;
        if (piece.color !== this.getCurrentPlayer().piece.color) return false;

        const dest = this.grid[to.row][to.col];
        if (dest && dest.color === piece.color) return false;

        const valid = this.getValidMoves(from);
        if (!valid.some(p => p.row === to.row && p.col === to.col)) return false;

        this.grid[to.row][to.col] = piece;
        this.grid[from.row][from.col] = null;
        this.moveHistory.push({
            player: this.getCurrentPlayer(), from, to,
        });

        if (!this.bothKingsAlive()) {
            this.status = GameStatus.COMPLETED;
            this.winner = this.getCurrentPlayer();
        }

        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % 2;
        return true;
    }

    private bothKingsAlive(): boolean {
        let wk = false, bk = false;
        for (let r = 0; r < 8; r++)
            for (let c = 0; c < 8; c++) {
                const p = this.grid[r][c];
                if (p && p.type === PieceType.KING) {
                    if (p.color === '#FFFFFF') wk = true;
                    else bk = true;
                }
            }
        return wk && bk;
    }

    getValidMoves(pos: Position): Position[] {
        const piece = this.grid[pos.row][pos.col];
        if (!piece) return [];
        const moves: Position[] = [];
        const { row, col } = pos;

        switch (piece.type) {
            case PieceType.PAWN: {
                const dir = piece.color === '#FFFFFF' ? -1 : 1;
                const startRow = piece.color === '#FFFFFF' ? 6 : 1;
                const nr1 = row + dir;
                if (nr1 < 0 || nr1 >= 8) break;
                if (!this.grid[nr1][col]) {
                    moves.push({ row: nr1, col });
                    if (row === startRow) {
                        const nr2 = row + 2 * dir;
                        if (!this.grid[nr2][col]) moves.push({ row: nr2, col });
                    }
                }
                for (const dc of [-1, 1]) {
                    const nc = col + dc;
                    if (nc >= 0 && nc < 8) {
                        const target = this.grid[nr1][nc];
                        if (target && target.color !== piece.color)
                            moves.push({ row: nr1, col: nc });
                    }
                }
                break;
            }
            case PieceType.KNIGHT: {
                const jumps = [[-2, -1], [-2, 1], [-1, -2], [-1, 2],
                               [1, -2], [1, 2], [2, -1], [2, 1]];
                for (const [dr, dc] of jumps) {
                    const nr = row + dr, nc = col + dc;
                    if (nr >= 0 && nr < 8 && nc >= 0 && nc < 8) {
                        const t = this.grid[nr][nc];
                        if (!t || t.color !== piece.color) moves.push({ row: nr, col: nc });
                    }
                }
                break;
            }
            case PieceType.KING: {
                for (const dr of [-1, 0, 1])
                    for (const dc of [-1, 0, 1]) {
                        if (dr === 0 && dc === 0) continue;
                        const nr = row + dr, nc = col + dc;
                        if (nr >= 0 && nr < 8 && nc >= 0 && nc < 8) {
                            const t = this.grid[nr][nc];
                            if (!t || t.color !== piece.color) moves.push({ row: nr, col: nc });
                        }
                    }
                break;
            }
            case PieceType.ROOK:
                for (const [dr, dc] of [[0, 1], [0, -1], [1, 0], [-1, 0]])
                    this.slideMoves(pos, dr, dc, moves, piece);
                break;
            case PieceType.BISHOP:
                for (const [dr, dc] of [[1, 1], [1, -1], [-1, 1], [-1, -1]])
                    this.slideMoves(pos, dr, dc, moves, piece);
                break;
            case PieceType.QUEEN:
                for (const [dr, dc] of [[0, 1], [0, -1], [1, 0], [-1, 0],
                                         [1, 1], [1, -1], [-1, 1], [-1, -1]])
                    this.slideMoves(pos, dr, dc, moves, piece);
                break;
        }
        return moves;
    }

    private slideMoves(pos: Position, dr: number, dc: number,
                       moves: Position[], piece: Piece): void {
        let r = pos.row + dr, c = pos.col + dc;
        while (r >= 0 && r < 8 && c >= 0 && c < 8) {
            const target = this.grid[r][c];
            if (!target) {
                moves.push({ row: r, col: c });
            } else {
                if (target.color !== piece.color) moves.push({ row: r, col: c });
                break;
            }
            r += dr; c += dc;
        }
    }
}