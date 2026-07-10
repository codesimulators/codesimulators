import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

// Append-only. Net balance is NEVER stored — it's derived by replaying the
// log, so it can never drift out of sync with the history that produced it.
public class Ledger {
    private final List<Expense> expenses = new ArrayList<>();

    public void record(Expense expense) { expenses.add(expense); }

    public Map<String, Long> getNetBalances() {
        Map<String, Long> net = new LinkedHashMap<>();
        for (Expense e : expenses) {
            net.merge(e.paidBy, e.totalCents, Long::sum);
            for (Map.Entry<String, Long> share : e.shares.entrySet()) {
                net.merge(share.getKey(), -share.getValue(), Long::sum);
            }
        }
        return net;
    }

    public List<Expense> history() { return expenses; }
}