public class Move {
    public final Player player;
    public final Position to;

    public Move(Player player, Position to) {
        this.player = player;
        this.to = to;
    }
}