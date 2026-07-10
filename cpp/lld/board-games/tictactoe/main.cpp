#include <iostream>
#include "TicTacToeEngine.cpp"

int main() {
    TicTacToeEngine engine(3);  // constructor calls start()

    Position moves[] = { {0,0}, {1,0}, {0,1}, {1,1}, {0,2} };
    for (const auto& to : moves) {
        Player player = engine.getCurrentPlayer();
        bool ok = engine.makeMove(player, to);
        std::cout << player.name << " (" << player.piece.symbol
                  << ") -> (" << to.row << "," << to.col << ")  "
                  << (ok ? "OK" : "rejected") << std::endl;
    }

    auto winner = engine.getWinner();
    if (winner) {
        std::cout << "Winner: " << winner->name
                  << " (" << winner->piece.symbol << ")" << std::endl;
    } else {
        std::cout << "No winner" << std::endl;
    }
    return 0;
}