import java.util.List;

public class Main {
    public static void main(String[] args) {
        ChessEngine engine = new ChessEngine(); // constructor calls start()

        for (int turn = 0; turn < 6 && engine.getStatus() == GameStatus.IN_PROGRESS; turn++) {
            Player player = engine.getCurrentPlayer();
            boolean played = false;
            for (int r = 0; r < 8 && !played; r++) {
                for (int c = 0; c < 8 && !played; c++) {
                    Position from = new Position(r, c);
                    List<Position> moves = engine.getValidMoves(from);
                    if (!moves.isEmpty() && engine.makeMove(from, moves.get(0))) {
                        Position to = moves.get(0);
                        System.out.printf("%s (%s) %d,%d -> %d,%d%n",
                            player.name, player.piece.color, r, c, to.row, to.col);
                        played = true;
                    }
                }
            }
        }
    }
}