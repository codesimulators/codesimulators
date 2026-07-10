import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

// Percentages must sum to 100; cents are floored per person and the
// leftover pennies handed out the same deterministic way as EqualSplit.
public class PercentSplit implements Split {
    private final Map<String, Integer> percentages;

    public PercentSplit(Map<String, Integer> percentages) { this.percentages = percentages; }

    @Override
    public Map<String, Long> computeShares(long totalCents, List<String> participantIds) {
        int pctSum = 0;
        for (String id : participantIds) pctSum += percentages.getOrDefault(id, 0);
        if (pctSum != 100) throw new IllegalArgumentException("percentages (" + pctSum + ") must sum to 100");

        long[] base = new long[participantIds.size()];
        long assigned = 0;
        for (int i = 0; i < participantIds.size(); i++) {
            base[i] = (totalCents * percentages.get(participantIds.get(i))) / 100;
            assigned += base[i];
        }
        long remainder = totalCents - assigned;

        Map<String, Long> shares = new LinkedHashMap<>();
        for (int i = 0; i < participantIds.size(); i++) {
            long bump = remainder > 0 ? 1 : 0;
            shares.put(participantIds.get(i), base[i] + bump);
            remainder -= bump;
        }
        return shares;
    }
}