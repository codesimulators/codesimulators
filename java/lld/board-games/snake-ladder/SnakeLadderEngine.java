import java.util.*;

public class SnakeLadderEngine {
    private static final Piece[] TOKEN_PIECES = {
        new Piece("🔴", "#EF4444"),
        new Piece("🔵", "#3B82F6"),
        new Piece("🟢", "#10B981"),
        new Piece("🟡", "#F59E0B"),
    };

    private List<Player> players;
    private SnakeLadderConfig config;
    private Map<String, Integer> positions = new HashMap<>();
    private int currentPlayerIndex;
    private GameStatus status;
    private List<SnakeLadderMove> moveHistory = new ArrayList<>();
    private Player winner;

    public SnakeLadderEngine() {
        this(Arrays.asList(
            new Player("Player 1", TOKEN_PIECES[0]),
            new Player("Player 2", TOKEN_PIECES[1])
        ), SnakeLadderConfig.standard());
    }

    public SnakeLadderEngine(List<Player> players) {
        this(players, SnakeLadderConfig.standard());
    }

    public SnakeLadderEngine(List<Player> players, SnakeLadderConfig config) {
        this.players = players;
        this.config = config;
        start();
    }

    public void start() {
        status = GameStatus.IN_PROGRESS;
        currentPlayerIndex = 0;
        moveHistory.clear();
        winner = null;
        positions = new HashMap<>();
        for (Player p : players) positions.put(p.name, 0);
    }

    public int rollDice() {
        return (int)(Math.random() * 6) + 1;
    }

    public static class MoveResult {
        public final boolean success;
        public final String error;
        public final SnakeLadderMove move;
        public MoveResult(boolean s, String e, SnakeLadderMove m) { success = s; error = e; move = m; }
    }

    public MoveResult makeMove(Player player, int diceValue) {
        if (status != GameStatus.IN_PROGRESS) {
            return new MoveResult(false, "Game not in progress", null);
        }

        int currentPos = positions.getOrDefault(player.name, 0);
        int newPos = currentPos + diceValue;

        if (newPos > config.finish) {
            newPos = currentPos;
            SnakeLadderMove move = new SnakeLadderMove(player, diceValue, currentPos, newPos, false, false);
            moveHistory.add(move);
            currentPlayerIndex = (currentPlayerIndex + 1) % players.size();
            return new MoveResult(true, null, move);
        }

        boolean landedOnSnake = false;
        boolean landedOnLadder = false;

        if (config.snakes.containsKey(newPos)) {
            newPos = config.snakes.get(newPos);
            landedOnSnake = true;
        } else if (config.ladders.containsKey(newPos)) {
            newPos = config.ladders.get(newPos);
            landedOnLadder = true;
        }

        positions.put(player.name, newPos);
        SnakeLadderMove move = new SnakeLadderMove(player, diceValue, currentPos, newPos, landedOnSnake, landedOnLadder);
        moveHistory.add(move);

        if (newPos == config.finish) {
            status = GameStatus.COMPLETED;
            winner = player;
        } else {
            currentPlayerIndex = (currentPlayerIndex + 1) % players.size();
        }

        return new MoveResult(true, null, move);
    }

    public int getPosition(Player player) {
        return positions.getOrDefault(player.name, 0);
    }

    public Player getCurrentPlayer() { return players.get(currentPlayerIndex); }
    public GameStatus getStatus() { return status; }
    public Player getWinner() { return winner; }

    public List<Map<String, Object>> getBoardCells() {
        List<Map<String, Object>> cells = new ArrayList<>();
        for (int i = 1; i <= config.finish; i++) {
            List<Player> occupying = new ArrayList<>();
            for (Player p : players) {
                if (positions.getOrDefault(p.name, 0) == i) occupying.add(p);
            }
            Map<String, Object> entry = new HashMap<>();
            entry.put("cell", i);
            entry.put("players", occupying);
            if (config.snakes.containsKey(i)) entry.put("snake", config.snakes.get(i));
            if (config.ladders.containsKey(i)) entry.put("ladder", config.ladders.get(i));
            cells.add(entry);
        }
        return cells;
    }
}