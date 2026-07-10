import { ChessEngine } from './ChessEngine';
import { GameStatus } from './GameStatus';
import { Position } from './Position';

const engine = new ChessEngine();
engine.start();

// Play a few turns: each side makes its first available legal move.
for (let turn = 0; turn < 6 && engine.getStatus() === GameStatus.IN_PROGRESS; turn++) {
    const player = engine.getCurrentPlayer();
    let played = false;
    for (let r = 0; r < 8 && !played; r++) {
        for (let c = 0; c < 8 && !played; c++) {
            const from: Position = { row: r, col: c };
            const moves = engine.getValidMoves(from);
            if (moves.length && engine.makeMove(from, moves[0])) {
                const to = moves[0];
                console.log(`${player.name} (${player.piece.color}) ${r},${c} -> ${to.row},${to.col}`);
                played = true;
            }
        }
    }
}