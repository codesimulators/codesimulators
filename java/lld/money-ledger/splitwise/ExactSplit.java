import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

// Caller supplies the exact cents each participant owes; we only verify
// they add up — this split never invents a number.
public class ExactSplit implements Split {
    private final Map<String, Long> amounts;

    public ExactSplit(Map<String, Long> amounts) { this.amounts = amounts; }

    @Override
    public Map<String, Long> computeShares(long totalCents, List<String> participantIds) {
        long sum = 0;
        for (String id : participantIds) sum += amounts.getOrDefault(id, 0L);
        if (sum != totalCents) {
            throw new IllegalArgumentException("exact shares (" + sum + ") must sum to total (" + totalCents + ")");
        }
        Map<String, Long> shares = new LinkedHashMap<>();
        for (String id : participantIds) shares.put(id, amounts.get(id));
        return shares;
    }
}