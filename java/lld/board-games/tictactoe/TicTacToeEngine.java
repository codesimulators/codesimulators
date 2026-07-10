import java.util.*;

public class TicTacToeEngine {
    private Piece[][] grid;
    private Player[] players = {
        new Player("Player 1", new Piece("X", "#818CF8")),
        new Player("Player 2", new Piece("O", "#F59E0B")),
    };
    private int size;
    private int currentPlayerIndex;
    private GameStatus status;
    private List<Move> moveHistory = new ArrayList<>();
    private Player winner;

    public TicTacToeEngine(int size) {
        this.size = size;
        this.grid = new Piece[size][size];
        start();
    }

    public void start() {
        this.status = GameStatus.IN_PROGRESS;
        this.currentPlayerIndex = 0;
        this.moveHistory.clear();
        this.winner = null;
        for (int r = 0; r < size; r++) {
            Arrays.fill(grid[r], null);
        }
    }

    public Piece[][] getGrid() {
        Piece[][] copy = new Piece[size][size];
        for (int r = 0; r < size; r++) {
            copy[r] = Arrays.copyOf(grid[r], size);
        }
        return copy;
    }

    public Player getCurrentPlayer() {
        return players[currentPlayerIndex];
    }

    public GameStatus getStatus() {
        return status;
    }

    public Player getWinner() {
        return winner;
    }

    public boolean makeMove(Player player, Position to) {
        if (status != GameStatus.IN_PROGRESS) return false;
        if (to.row < 0 || to.row >= size ||
            to.col < 0 || to.col >= size) return false;
        if (grid[to.row][to.col] != null) return false;
        if (player != players[currentPlayerIndex]) return false;

        grid[to.row][to.col] = player.piece;
        moveHistory.add(new Move(player, to));

        if (checkWin(to)) {
            status = GameStatus.COMPLETED;
            winner = player;
            return true;
        }

        boolean full = true;
        for (int r = 0; r < size && full; r++) {
            for (int c = 0; c < size && full; c++) {
                if (grid[r][c] == null) full = false;
            }
        }
        if (full) {
            status = GameStatus.DRAW;
            return true;
        }

        currentPlayerIndex =
            (currentPlayerIndex + 1) % players.length;
        return true;
    }

    private boolean checkWin(Position pos) {
        Piece p = grid[pos.row][pos.col];
        if (p == null) return false;

        int[][] dirs = {
            {0, 1}, {1, 0}, {1, 1}, {1, -1}
        };
        for (int[] d : dirs) {
            int count = 1;
            for (int dir : new int[]{-1, 1}) {
                for (int i = 1; i < size; i++) {
                    int r = pos.row + d[0] * i * dir;
                    int c = pos.col + d[1] * i * dir;
                    if (r < 0 || r >= size ||
                        c < 0 || c >= size) break;
                    if (grid[r][c] != null &&
                        grid[r][c].symbol.equals(p.symbol)) {
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
}