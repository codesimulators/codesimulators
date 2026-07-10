#include "game_status.h"
#include "piece_type.h"
#include "position.h"
#include "piece.h"
#include "player.h"
#include "move.h"

class ChessEngine {
    std::vector<std::vector<std::optional<Piece>>> grid;
    std::vector<Player> players;
    int currentPlayerIndex;
    GameStatus status;
    std::vector<Move> moveHistory;
    std::optional<Player> winner;

    std::string sym(PieceType t, bool white) {
        switch (t) {
            case PieceType::KING:   return white ? "♔" : "♚";
            case PieceType::QUEEN:  return white ? "♕" : "♛";
            case PieceType::ROOK:   return white ? "♖" : "♜";
            case PieceType::BISHOP: return white ? "♗" : "♝";
            case PieceType::KNIGHT: return white ? "♘" : "♞";
            default:                return white ? "♙" : "♟";
        }
    }

    void setupBoard() {
        std::vector<PieceType> backRank = {
            PieceType::ROOK, PieceType::KNIGHT, PieceType::BISHOP,
            PieceType::QUEEN, PieceType::KING, PieceType::BISHOP,
            PieceType::KNIGHT, PieceType::ROOK
        };
        for (int c = 0; c < 8; c++) {
            grid[0][c] = Piece{sym(backRank[c], false), "#000000", backRank[c]};
            grid[1][c] = Piece{sym(PieceType::PAWN, false), "#000000", PieceType::PAWN};
            grid[6][c] = Piece{sym(PieceType::PAWN, true), "#FFFFFF", PieceType::PAWN};
            grid[7][c] = Piece{sym(backRank[c], true), "#FFFFFF", backRank[c]};
        }
    }

public:
    ChessEngine()
        : currentPlayerIndex(0), status(GameStatus::NOT_STARTED) {
        players = {
            Player{"White", Piece{"♔", "#FFFFFF", PieceType::KING}},
            Player{"Black", Piece{"♚", "#000000", PieceType::KING}},
        };
        grid.resize(8, std::vector<std::optional<Piece>>(8, std::nullopt));
        start();
    }

    void start() {
        status = GameStatus::IN_PROGRESS; currentPlayerIndex = 0;
        moveHistory.clear(); winner = std::nullopt;
        grid.assign(8, std::vector<std::optional<Piece>>(8, std::nullopt));
        setupBoard();
    }

    auto getGrid() const { return grid; }
    Player getCurrentPlayer() const { return players[currentPlayerIndex]; }
    GameStatus getStatus() const { return status; }
    std::optional<Player> getWinner() const { return winner; }

    bool makeMove(const Position& from, const Position& to) {
        if (status != GameStatus::IN_PROGRESS) return false;
        if (from.row < 0 || from.row >= 8 || from.col < 0 || from.col >= 8) return false;
        if (to.row < 0 || to.row >= 8 || to.col < 0 || to.col >= 8) return false;

        auto& piece = grid[from.row][from.col];
        if (!piece.has_value()) return false;
        if (piece->color != getCurrentPlayer().piece.color) return false;

        auto& dest = grid[to.row][to.col];
        if (dest.has_value() && dest->color == piece->color) return false;

        auto valid = getValidMoves(from);
        bool ok = false;
        for (auto& p : valid)
            if (p.row == to.row && p.col == to.col) { ok = true; break; }
        if (!ok) return false;

        grid[to.row][to.col] = *piece;
        grid[from.row][from.col] = std::nullopt;
        moveHistory.push_back({getCurrentPlayer(), from, to});

        if (!bothKingsAlive()) { status = GameStatus::COMPLETED; winner = getCurrentPlayer(); }

        currentPlayerIndex = (currentPlayerIndex + 1) % 2;
        return true;
    }

    std::vector<Position> getValidMoves(const Position& pos) const {
        std::vector<Position> moves;
        auto& piece = grid[pos.row][pos.col];
        if (!piece.has_value()) return moves;
        int row = pos.row, col = pos.col;

        switch (piece->type) {
            case PieceType::PAWN: {
                int dir = piece->color == "#FFFFFF" ? -1 : 1;
                int startRow = piece->color == "#FFFFFF" ? 6 : 1;
                int nr1 = row + dir;
                if (nr1 < 0 || nr1 >= 8) break;
                if (!grid[nr1][col].has_value()) {
                    moves.push_back({nr1, col});
                    if (row == startRow) {
                        int nr2 = row + 2 * dir;
                        if (!grid[nr2][col].has_value()) moves.push_back({nr2, col});
                    }
                }
                for (int dc : {-1, 1}) {
                    int nc = col + dc;
                    if (nc >= 0 && nc < 8) {
                        auto& t = grid[nr1][nc];
                        if (t.has_value() && t->color != piece->color)
                            moves.push_back({nr1, nc});
                    }
                }
                break;
            }
            case PieceType::KNIGHT: {
                int jumps[8][2] = {{-2,-1},{-2,1},{-1,-2},{-1,2},
                                   {1,-2},{1,2},{2,-1},{2,1}};
                for (auto& j : jumps) {
                    int nr = row + j[0], nc = col + j[1];
                    if (nr >= 0 && nr < 8 && nc >= 0 && nc < 8) {
                        auto& t = grid[nr][nc];
                        if (!t.has_value() || t->color != piece->color)
                            moves.push_back({nr, nc});
                    }
                }
                break;
            }
            case PieceType::KING: {
                for (int dr = -1; dr <= 1; dr++)
                    for (int dc = -1; dc <= 1; dc++) {
                        if (dr == 0 && dc == 0) continue;
                        int nr = row + dr, nc = col + dc;
                        if (nr >= 0 && nr < 8 && nc >= 0 && nc < 8) {
                            auto& t = grid[nr][nc];
                            if (!t.has_value() || t->color != piece->color)
                                moves.push_back({nr, nc});
                        }
                    }
                break;
            }
            case PieceType::ROOK:
                for (auto& d : std::vector<std::pair<int,int>>{{0,1},{0,-1},{1,0},{-1,0}})
                    slideMoves(pos, d.first, d.second, moves, *piece);
                break;
            case PieceType::BISHOP:
                for (auto& d : std::vector<std::pair<int,int>>{{1,1},{1,-1},{-1,1},{-1,-1}})
                    slideMoves(pos, d.first, d.second, moves, *piece);
                break;
            case PieceType::QUEEN:
                for (auto& d : std::vector<std::pair<int,int>>{{0,1},{0,-1},{1,0},{-1,0},
                                                                 {1,1},{1,-1},{-1,1},{-1,-1}})
                    slideMoves(pos, d.first, d.second, moves, *piece);
                break;
        }
        return moves;
    }

private:
    bool bothKingsAlive() const {
        bool wk = false, bk = false;
        for (int r = 0; r < 8; r++)
            for (int c = 0; c < 8; c++) {
                auto& p = grid[r][c];
                if (p.has_value() && p->type == PieceType::KING) {
                    if (p->color == "#FFFFFF") wk = true;
                    else bk = true;
                }
            }
        return wk && bk;
    }

    void slideMoves(const Position& pos, int dr, int dc,
                    std::vector<Position>& moves, const Piece& piece) const {
        int r = pos.row + dr, c = pos.col + dc;
        while (r >= 0 && r < 8 && c >= 0 && c < 8) {
            auto& target = grid[r][c];
            if (!target.has_value()) {
                moves.push_back({r, c});
            } else {
                if (target->color != piece.color) moves.push_back({r, c});
                break;
            }
            r += dr; c += dc;
        }
    }
};