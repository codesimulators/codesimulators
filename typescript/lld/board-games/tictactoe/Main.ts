import { TicTacToeEngine } from './TicTacToeEngine';
import { GameStatus } from './GameStatus';
import { Position } from './Position';

// X wins on the top row; players alternate automatically.
const engine = new TicTacToeEngine(3);
engine.start();

const moves: Position[] = [
    { row: 0, col: 0 }, // X
    { row: 1, col: 0 }, // O
    { row: 0, col: 1 }, // X
    { row: 1, col: 1 }, // O
    { row: 0, col: 2 }, // X — completes the top row
];

for (const to of moves) {
    const player = engine.getCurrentPlayer();
    const ok = engine.makeMove(player, to);
    console.log(`${player.name} (${player.piece.symbol}) -> (${to.row},${to.col})  ${ok ? 'OK' : 'rejected'}`);
}

console.log('Status:', GameStatus[engine.getStatus()]);
const winner = engine.getWinner();
console.log(winner ? `Winner: ${winner.name} (${winner.piece.symbol})` : 'No winner');