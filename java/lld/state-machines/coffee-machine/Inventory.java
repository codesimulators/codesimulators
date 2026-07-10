import java.util.*;
import java.util.stream.Collectors;

// The resource guard. canMake() gates transitions; consume() commits.
public class Inventory {
    private final Map<String, Integer> stock;
    public Inventory(Map<String, Integer> stock) { this.stock = new HashMap<>(stock); }

    public boolean canMake(Recipe r) {
        return r.needs().entrySet().stream()
            .allMatch(e -> stock.getOrDefault(e.getKey(), 0) >= e.getValue());
    }

    public List<String> missing(Recipe r) {
        return r.needs().entrySet().stream()
            .filter(e -> stock.getOrDefault(e.getKey(), 0) < e.getValue())
            .map(Map.Entry::getKey).collect(Collectors.toList());
    }

    public void consume(Recipe r) {
        r.needs().forEach((ing, qty) -> stock.merge(ing, -qty, Integer::sum));
    }

    public void refill(String ing, int qty) { stock.merge(ing, qty, Integer::sum); }
}