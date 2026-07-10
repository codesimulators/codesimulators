public class Main {
    public static void main(String[] args) {
        SnakeLadderEngine engine = new SnakeLadderEngine();
        engine.start();

        int turns = 0;
        while (engine.getStatus() == GameStatus.IN_PROGRESS && turns < 300) {
            Player player = engine.getCurrentPlayer();
            int dice = engine.rollDice();
            engine.makeMove(player, dice);
            System.out.printf("%s rolled %d -> cell %d%n",
                player.name, dice, engine.getPosition(player));
            turns++;
        }

        Player winner = engine.getWinner();
        System.out.println(winner != null
            ? "Winner: " + winner.name + " in " + turns + " turns"
            : "No winner");
    }
}