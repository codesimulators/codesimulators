import { SnakeLadderEngine } from './SnakeLadderEngine';
import { GameStatus } from './GameStatus';

const engine = new SnakeLadderEngine();
engine.start();

let turns = 0;
while (engine.getStatus() === GameStatus.IN_PROGRESS && turns < 300) {
    const player = engine.getCurrentPlayer();
    const dice = engine.rollDice();
    const { move } = engine.makeMove(player, dice);
    const hop = move?.landedOnSnake ? ' 🐍' : move?.landedOnLadder ? ' 🪜' : '';
    console.log(`${player.name} rolled ${dice} -> cell ${engine.getPosition(player)}${hop}`);
    turns++;
}

const winner = engine.getWinner();
console.log(winner ? `🏆 ${winner.name} wins in ${turns} turns` : 'No winner');