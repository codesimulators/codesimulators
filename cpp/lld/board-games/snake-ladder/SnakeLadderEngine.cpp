#include "game_status.h"
#include "player.h"
#include "snake_ladder_move.h"
#include "snake_ladder_config.h"

class SnakeLadderEngine {
    static const std::vector<Piece>& tokenPieces() {
        static std::vector<Piece> p{
            {"🔴", "#EF4444"}, {"🔵", "#3B82F6"},
            {"🟢", "#10B981"}, {"🟡", "#F59E0B"}
        };
        return p;
    }

    std::vector<Player> players;
    SnakeLadderConfig config;
    std::unordered_map<std::string, int> positions;
    int currentPlayerIndex;
    GameStatus status;
    std::vector<SnakeLadderMove> moveHistory;
    std::optional<Player> winner;

public:
    SnakeLadderEngine()
        : players{{"Player 1", tokenPieces()[0]}, {"Player 2", tokenPieces()[1]}},
          config(SnakeLadderConfig::standard()),
          currentPlayerIndex(0), status(GameStatus::NOT_STARTED) { start(); }

    SnakeLadderEngine(const std::vector<Player>& p, SnakeLadderConfig c = SnakeLadderConfig::standard())
        : players(p), config(c),
          currentPlayerIndex(0), status(GameStatus::NOT_STARTED) { start(); }

    void start() {
        status = GameStatus::IN_PROGRESS; currentPlayerIndex = 0;
        moveHistory.clear(); winner = std::nullopt;
        positions.clear();
        for (auto& p : players) positions[p.name] = 0;
    }

    int rollDice() { return rand() % 6 + 1; }

    struct MoveResult {
        bool success;
        std::string error;
        std::optional<SnakeLadderMove> move;
    };

    MoveResult makeMove(const Player& player, int diceValue) {
        if (status != GameStatus::IN_PROGRESS)
            return {false, "Game not in progress", std::nullopt};

        int currentPos = positions[player.name];
        int newPos = currentPos + diceValue;

        if (newPos > config.finish) {
            newPos = currentPos;
            SnakeLadderMove m{player, diceValue, currentPos, newPos, false, false};
            moveHistory.push_back(m);
            currentPlayerIndex = (currentPlayerIndex + 1) % players.size();
            return {true, "", m};
        }

        bool landedOnSnake = false, landedOnLadder = false;

        auto sit = config.snakes.find(newPos);
        if (sit != config.snakes.end()) { newPos = sit->second; landedOnSnake = true; }
        else {
            auto lit = config.ladders.find(newPos);
            if (lit != config.ladders.end()) { newPos = lit->second; landedOnLadder = true; }
        }

        positions[player.name] = newPos;
        SnakeLadderMove m{player, diceValue, currentPos, newPos, landedOnSnake, landedOnLadder};
        moveHistory.push_back(m);

        if (newPos == config.finish) { status = GameStatus::COMPLETED; winner = player; }
        else { currentPlayerIndex = (currentPlayerIndex + 1) % players.size(); }

        return {true, "", m};
    }

    int getPosition(const Player& player) { return positions[player.name]; }
    Player getCurrentPlayer() { return players[currentPlayerIndex]; }
    GameStatus getStatus() { return status; }
    std::optional<Player> getWinner() { return winner; }

    std::vector<std::unordered_map<std::string, std::any>> getBoardCells() {
        std::vector<std::unordered_map<std::string, std::any>> cells;
        for (int i = 1; i <= config.finish; i++) {
            std::vector<Player> occupying;
            for (auto& p : players)
                if (positions[p.name] == i) occupying.push_back(p);
            std::unordered_map<std::string, std::any> entry;
            entry["cell"] = i; entry["players"] = occupying;
            auto sit = config.snakes.find(i);
            if (sit != config.snakes.end()) entry["snake"] = sit->second;
            auto lit = config.ladders.find(i);
            if (lit != config.ladders.end()) entry["ladder"] = lit->second;
            cells.push_back(entry);
        }
        return cells;
    }
};