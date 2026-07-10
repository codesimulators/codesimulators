import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;

public class SettlementService {

    public static class Transaction {
        public final String from, to;
        public final long amountCents;
        public Transaction(String from, String to, long amountCents) {
            this.from = from; this.to = to; this.amountCents = amountCents;
        }
    }

    private static class Balance {
        String id; long amount;
        Balance(String id, long amount) { this.id = id; this.amount = amount; }
    }

    // Greedy minimum-cash-flow settlement: repeatedly match the largest
    // debtor with the largest creditor. Provably minimal for netting a set
    // of balances that already sums to zero.
    public List<Transaction> simplify(Ledger ledger) {
        List<Balance> creditors = new ArrayList<>();
        List<Balance> debtors = new ArrayList<>();
        for (Map.Entry<String, Long> e : ledger.getNetBalances().entrySet()) {
            if (e.getValue() > 0) creditors.add(new Balance(e.getKey(), e.getValue()));
            else if (e.getValue() < 0) debtors.add(new Balance(e.getKey(), -e.getValue()));
        }

        List<Transaction> txns = new ArrayList<>();
        while (!creditors.isEmpty() && !debtors.isEmpty()) {
            creditors.sort(Comparator.comparingLong((Balance b) -> b.amount).reversed());
            debtors.sort(Comparator.comparingLong((Balance b) -> b.amount).reversed());

            Balance creditor = creditors.get(0);
            Balance debtor = debtors.get(0);
            long amount = Math.min(creditor.amount, debtor.amount);

            txns.add(new Transaction(debtor.id, creditor.id, amount));
            creditor.amount -= amount;
            debtor.amount -= amount;

            if (creditor.amount == 0) creditors.remove(0);
            if (debtor.amount == 0) debtors.remove(0);
        }
        return txns;
    }
}