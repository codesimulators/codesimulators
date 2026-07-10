import java.util.*;

public class ChessEngine {
    private Piece[][] grid;
    private Player[] players;
    private int currentPlayerIndex;
    private GameStatus status;
    private List<Move> moveHistory = new ArrayList<>();
    private Player winner;

    public ChessEngine() {
        players = new Player[] {
            new Player("White", new Piece("♔", "#FFFFFF", PieceType.KING)),
            new Player("Black", new Piece("♚", "#000000", PieceType.KING)),
        };
        grid = new Piece[8][8]; start();
    }

    public void start() {
        status = GameStatus.IN_PROGRESS; currentPlayerIndex = 0;
        moveHistory.clear(); winner = null;
        for (int r = 0; r < 8; r++) Arrays.fill(grid[r], null);
        setupBoard();
    }

    private String sym(PieceType t, boolean white) {
        switch (t) {
            case KING: return white ? "♔" : "♚";
            case QUEEN: return white ? "♕" : "♛";
            case ROOK: return white ? "♖" : "♜";
            case BISHOP: return white ? "♗" : "♝";
            case KNIGHT: return white ? "♘" : "♞";
            default: return white ? "♙" : "♟";
        }
    }

    private void setupBoard() {
        PieceType[] backRank = { PieceType.ROOK, PieceType.KNIGHT, PieceType.BISHOP,
            PieceType.QUEEN, PieceType.KING, PieceType.BISHOP,
            PieceType.KNIGHT, PieceType.ROOK };
        for (int c = 0; c < 8; c++) {
            grid[0][c] = new Piece(sym(backRank[c], false), "#000000", backRank[c]);
            grid[1][c] = new Piece(sym(PieceType.PAWN, false), "#000000", PieceType.PAWN);
            grid[6][c] = new Piece(sym(PieceType.PAWN, true), "#FFFFFF", PieceType.PAWN);
            grid[7][c] = new Piece(sym(backRank[c], true), "#FFFFFF", backRank[c]);
        }
    }

    public Piece[][] getGrid() {
        Piece[][] c = new Piece[8][8];
        for (int r = 0; r < 8; r++) c[r] = Arrays.copyOf(grid[r], 8);
        return c;
    }

    public Player getCurrentPlayer() { return players[currentPlayerIndex]; }
    public GameStatus getStatus() { return status; }
    public Player getWinner() { return winner; }

    public boolean makeMove(Position from, Position to) {
        if (status != GameStatus.IN_PROGRESS) return false;
        if (from.row < 0 || from.row >= 8 || from.col < 0 || from.col >= 8) return false;
        if (to.row < 0 || to.row >= 8 || to.col < 0 || to.col >= 8) return false;

        Piece piece = grid[from.row][from.col];
        if (piece == null) return false;
        if (!piece.color.equals(getCurrentPlayer().piece.color)) return false;

        Piece dest = grid[to.row][to.col];
        if (dest != null && dest.color.equals(piece.color)) return false;

        List<Position> valid = getValidMoves(from);
        boolean ok = false;
        for (Position p : valid)
            if (p.row == to.row && p.col == to.col) { ok = true; break; }
        if (!ok) return false;

        grid[to.row][to.col] = piece;
        grid[from.row][from.col] = null;
        moveHistory.add(new Move(getCurrentPlayer(), from, to));

        if (!bothKingsAlive()) { status = GameStatus.COMPLETED; winner = getCurrentPlayer(); }

        currentPlayerIndex = (currentPlayerIndex + 1) % 2;
        return true;
    }

    private boolean bothKingsAlive() {
        boolean wk = false, bk = false;
        for (int r = 0; r < 8; r++)
            for (int c = 0; c < 8; c++) {
                Piece p = grid[r][c];
                if (p != null && p.type == PieceType.KING) {
                    if (p.color.equals("#FFFFFF")) wk = true;
                    else bk = true;
                }
            }
        return wk && bk;
    }

    public List<Position> getValidMoves(Position pos) {
        List<Position> moves = new ArrayList<>();
        Piece piece = grid[pos.row][pos.col];
        if (piece == null) return moves;
        int row = pos.row, col = pos.col;

        switch (piece.type) {
            case PAWN: {
                int dir = piece.color.equals("#FFFFFF") ? -1 : 1;
                int startRow = piece.color.equals("#FFFFFF") ? 6 : 1;
                int nr1 = row + dir;
                if (nr1 < 0 || nr1 >= 8) break;
                if (grid[nr1][col] == null) {
                    moves.add(new Position(nr1, col));
                    if (row == startRow) {
                        int nr2 = row + 2 * dir;
                        if (grid[nr2][col] == null) moves.add(new Position(nr2, col));
                    }
                }
                for (int dc : new int[]{-1, 1}) {
                    int nc = col + dc;
                    if (nc >= 0 && nc < 8) {
                        Piece t = grid[nr1][nc];
                        if (t != null && !t.color.equals(piece.color))
                            moves.add(new Position(nr1, nc));
                    }
                }
                break;
            }
            case KNIGHT: {
                int[][] jumps = {{-2,-1},{-2,1},{-1,-2},{-1,2},
                                 {1,-2},{1,2},{2,-1},{2,1}};
                for (int[] j : jumps) {
                    int nr = row + j[0], nc = col + j[1];
                    if (nr >= 0 && nr < 8 && nc >= 0 && nc < 8) {
                        Piece t = grid[nr][nc];
                        if (t == null || !t.color.equals(piece.color))
                            moves.add(new Position(nr, nc));
                    }
                }
                break;
            }
            case KING: {
                for (int dr = -1; dr <= 1; dr++)
                    for (int dc = -1; dc <= 1; dc++) {
                        if (dr == 0 && dc == 0) continue;
                        int nr = row + dr, nc = col + dc;
                        if (nr >= 0 && nr < 8 && nc >= 0 && nc < 8) {
                            Piece t = grid[nr][nc];
                            if (t == null || !t.color.equals(piece.color))
                                moves.add(new Position(nr, nc));
                        }
                    }
                break;
            }
            case ROOK:
                for (int[] d : new int[][]{{0,1},{0,-1},{1,0},{-1,0}})
                    slideMoves(pos, d[0], d[1], moves, piece);
                break;
            case BISHOP:
                for (int[] d : new int[][]{{1,1},{1,-1},{-1,1},{-1,-1}})
                    slideMoves(pos, d[0], d[1], moves, piece);
                break;
            case QUEEN:
                for (int[] d : new int[][]{{0,1},{0,-1},{1,0},{-1,0},
                                           {1,1},{1,-1},{-1,1},{-1,-1}})
                    slideMoves(pos, d[0], d[1], moves, piece);
                break;
        }
        return moves;
    }

    private void slideMoves(Position pos, int dr, int dc,
                            List<Position> moves, Piece piece) {
        int r = pos.row + dr, c = pos.col + dc;
        while (r >= 0 && r < 8 && c >= 0 && c < 8) {
            Piece target = grid[r][c];
            if (target == null) {
                moves.add(new Position(r, c));
            } else {
                if (!target.color.equals(piece.color)) moves.add(new Position(r, c));
                break;
            }
            r += dr; c += dc;
        }
    }
}