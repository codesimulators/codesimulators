import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

// Floors the per-person share, then hands the leftover pennies to the
// first participants in a fixed order — deterministic, never a float.
public class EqualSplit implements Split {
    @Override
    public Map<String, Long> computeShares(long totalCents, List<String> participantIds) {
        int n = participantIds.size();
        long base = totalCents / n;
        long remainder = totalCents - base * n;

        Map<String, Long> shares = new LinkedHashMap<>();
        for (int i = 0; i < n; i++) {
            shares.put(participantIds.get(i), base + (i < remainder ? 1 : 0));
        }
        return shares;
    }
}