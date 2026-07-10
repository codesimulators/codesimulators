import java.util.HashMap;
import java.util.Map;

// The board layout — the ONLY thing that changes between a 10x10 board,
// a mini test board, or a completely different race game (see Main).
public class SnakeLadderConfig {
    public final int finish;                 // the winning cell
    public final Map<Integer, Integer> snakes;  // head -> tail
    public final Map<Integer, Integer> ladders; // bottom -> top

    public SnakeLadderConfig(int finish, Map<Integer, Integer> snakes, Map<Integer, Integer> ladders) {
        this.finish = finish; this.snakes = snakes; this.ladders = ladders;
    }

    public static SnakeLadderConfig standard() {
        Map<Integer, Integer> snakes = new HashMap<>();
        int[][] s = {{16,6},{46,25},{49,11},{62,19},{64,60},{74,53},{89,68},{92,88},{95,75},{99,80}};
        for (int[] row : s) snakes.put(row[0], row[1]);
        Map<Integer, Integer> ladders = new HashMap<>();
        int[][] l = {{2,38},{7,14},{8,31},{15,26},{21,42},{28,84},{36,44},{51,67},{71,91},{78,98},{87,94}};
        for (int[] row : l) ladders.put(row[0], row[1]);
        return new SnakeLadderConfig(100, snakes, ladders);
    }
}