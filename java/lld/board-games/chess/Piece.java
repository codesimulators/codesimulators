public class Piece {
    public final String symbol, color;   // hex: "#FFFFFF" | "#000000"
    public final PieceType type;
    public Piece(String s, String c, PieceType t) { symbol = s; color = c; type = t; }
}