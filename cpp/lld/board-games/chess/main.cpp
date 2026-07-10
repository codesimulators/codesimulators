#include <iostream>
#include "ChessEngine.cpp"

int main() {
    ChessEngine engine; // constructor calls start()

    for (int turn = 0; turn < 6 && engine.getStatus() == GameStatus::IN_PROGRESS; turn++) {
        Player player = engine.getCurrentPlayer();
        bool played = false;
        for (int r = 0; r < 8 && !played; r++) {
            for (int c = 0; c < 8 && !played; c++) {
                Position from{r, c};
                auto moves = engine.getValidMoves(from);
                if (!moves.empty() && engine.makeMove(from, moves[0])) {
                    std::cout << player.name << " (" << player.piece.color << ") "
                              << r << "," << c << " -> "
                              << moves[0].row << "," << moves[0].col << std::endl;
                    played = true;
                }
            }
        }
    }
    return 0;
}