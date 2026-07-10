import java.util.List;
import java.util.Map;

// Strategy interface: turn a total (in cents) + participant list into a
// validated per-person share map. Every concrete split must sum EXACTLY
// back to the total — no float remainders.
public interface Split {
    Map<String, Long> computeShares(long totalCents, List<String> participantIds);
}