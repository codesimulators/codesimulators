#include <vector>
#include <string>
#include <optional>
#include "game_status.h"
#include "position.h"
#include "piece.h"
#include "player.h"
#include "move.h"

class TicTacToeEngine {
    std::vector<std::vector<std::optional<Piece>>> grid;
    std::vector<Player> players = {
        Player{"Player 1", Piece{"X", "#818CF8"}},
        Player{"Player 2", Piece{"O", "#F59E0B"}},
    };
    int size;
    int currentPlayerIndex;
    GameStatus status;
    std::vector<Move> moveHistory;
    std::optional<Player> winner;

public:
    TicTacToeEngine(int s = 3)
        : size(s),
          currentPlayerIndex(0),
          status(GameStatus::NOT_STARTED) {
        start();
    }

    void start() {
        status = GameStatus::IN_PROGRESS;
        currentPlayerIndex = 0;
        moveHistory.clear();
        winner = std::nullopt;
        grid.assign(
            size,
            std::vector<std::optional<Piece>>(
                size, std::nullopt
            )
        );
    }

    auto getGrid() const { return grid; }

    Player getCurrentPlayer() const {
        return players[currentPlayerIndex];
    }

    GameStatus getStatus() const {
        return status;
    }

    std::optional<Player> getWinner() const {
        return winner;
    }

    bool makeMove(
        const Player& player,
        const Position& to
    ) {
        if (status != GameStatus::IN_PROGRESS) {
            return false;
        }
        if (to.row < 0 || to.row >= size ||
            to.col < 0 || to.col >= size) {
            return false;
        }
        if (grid[to.row][to.col].has_value()) {
            return false;
        }

        grid[to.row][to.col] = player.piece;
        moveHistory.push_back({player, to});

        if (checkWin(to)) {
            status = GameStatus::COMPLETED;
            winner = player;
            return true;
        }

        bool full = true;
        for (auto& row : grid) {
            for (auto& cell : row) {
                if (!cell.has_value()) {
                    full = false;
                }
            }
        }
        if (full) {
            status = GameStatus::DRAW;
            return true;
        }

        currentPlayerIndex =
            (currentPlayerIndex + 1) % players.size();
        return true;
    }

private:
    bool checkWin(const Position& pos) {
        auto piece = grid[pos.row][pos.col];
        if (!piece.has_value()) return false;

        int dirs[4][2] = {
            {0, 1}, {1, 0}, {1, 1}, {1, -1}
        };
        for (auto& d : dirs) {
            int count = 1;
            for (int dir : {-1, 1}) {
                for (int i = 1; i < size; i++) {
                    int r = pos.row + d[0] * i * dir;
                    int c = pos.col + d[1] * i * dir;
                    if (r < 0 || r >= size ||
                        c < 0 || c >= size) break;
                    auto cell = grid[r][c];
                    if (cell.has_value() &&
                        cell->symbol == piece->symbol) {
                        count++;
                    } else {
                        break;
                    }
                }
            }
            if (count >= size) return true;
        }
        return false;
    }
};