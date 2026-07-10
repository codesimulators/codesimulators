// A record of one turn — also the replay/undo log entry.
public class SnakeLadderMove {
    public final Player player;
    public final int diceValue, fromCell, toCell;
    public final boolean landedOnSnake, landedOnLadder;
    public SnakeLadderMove(Player p, int dv, int fc, int tc, boolean los, boolean lol) {
        player = p; diceValue = dv; fromCell = fc; toCell = tc;
        landedOnSnake = los; landedOnLadder = lol;
    }
}