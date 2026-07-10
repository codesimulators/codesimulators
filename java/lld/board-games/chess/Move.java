public class Move {
    public final Player player;
    public final Position from, to;
    public Move(Player p, Position f, Position t) { player = p; from = f; to = t; }
}