public class Main {
    public static void main(String[] args) {
        // Constructor calls start() for us.
        TicTacToeEngine engine = new TicTacToeEngine(3);

        int[][] moves = { {0,0}, {1,0}, {0,1}, {1,1}, {0,2} };
        for (int[] m : moves) {
            Player player = engine.getCurrentPlayer();
            Position to = new Position(m[0], m[1]);
            boolean ok = engine.makeMove(player, to);
            System.out.printf("%s (%s) -> (%d,%d)  %s%n",
                player.name, player.piece.symbol, m[0], m[1], ok ? "OK" : "rejected");
        }

        System.out.println("Status: " + engine.getStatus());
        Player winner = engine.getWinner();
        System.out.println(winner != null
            ? "Winner: " + winner.name + " (" + winner.piece.symbol + ")"
            : "No winner");
    }
}