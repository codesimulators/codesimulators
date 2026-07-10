#include <iostream>
#include "SnakeLadderEngine.cpp"

int main() {
    SnakeLadderEngine engine;
    engine.start();

    int turns = 0;
    while (engine.getStatus() == GameStatus::IN_PROGRESS && turns < 300) {
        Player player = engine.getCurrentPlayer();
        int dice = engine.rollDice();
        engine.makeMove(player, dice);
        std::cout << player.name << " rolled " << dice
                  << " -> cell " << engine.getPosition(player) << std::endl;
        turns++;
    }

    auto winner = engine.getWinner();
    std::cout << (winner ? "Winner: " + winner->name : "No winner") << std::endl;
    return 0;
}