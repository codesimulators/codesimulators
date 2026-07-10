import java.util.List;
import java.util.Map;

// Facade — the only class callers touch. Coordinates users, the ledger and
// the settlement algorithm; owns no business logic of its own.
public class Group {
    private final Ledger ledger = new Ledger();
    private final SettlementService settlement = new SettlementService();
    private int nextId = 1;

    public Expense addExpense(String paidBy, long totalCents, List<String> participantIds, Split split) {
        Expense expense = new Expense("e" + (nextId++), paidBy, totalCents, participantIds, split);
        ledger.record(expense);
        return expense;
    }

    public Map<String, Long> getBalances() { return ledger.getNetBalances(); }

    public List<SettlementService.Transaction> simplifyDebts() { return settlement.simplify(ledger); }
}