import java.util.List;
import java.util.Map;

// Immutable once created — computing shares in the constructor is what
// makes it possible to reject a bad split BEFORE it ever touches the ledger.
public class Expense {
    public final String id;
    public final String paidBy;
    public final long totalCents;
    public final List<String> participantIds;
    public final Map<String, Long> shares;

    public Expense(String id, String paidBy, long totalCents, List<String> participantIds, Split split) {
        this.id = id;
        this.paidBy = paidBy;
        this.totalCents = totalCents;
        this.participantIds = participantIds;
        this.shares = split.computeShares(totalCents, participantIds);
    }
}