public class TransferService {

    public static class InsufficientFunds extends RuntimeException {}

    public static class TransferResult {
        public final String status = "OK";
        public final long amountCents;
        public TransferResult(long amountCents) { this.amountCents = amountCents; }
    }

    private final IdempotencyStore idempotency;

    public TransferService(IdempotencyStore idempotency) { this.idempotency = idempotency; }

    // Debits one ledger and credits another as a single atomic step. The two
    // ledgers are locked in a FIXED order (by wallet id) so a concurrent
    // transfer running the opposite direction can never deadlock against
    // this one.
    public TransferResult transfer(String fromId, Ledger fromLedger, String toId, Ledger toLedger, long amountCents, String idempotencyKey) {
        TransferResult cached = idempotency.get(idempotencyKey);
        if (cached != null) return cached;                   // retry — do nothing new

        boolean fromFirst = fromId.compareTo(toId) < 0;
        Ledger first = fromFirst ? fromLedger : toLedger;
        Ledger second = fromFirst ? toLedger : fromLedger;

        synchronized (first) {
            synchronized (second) {
                if (fromLedger.getBalance() < amountCents) throw new InsufficientFunds();
                fromLedger.append(LedgerEntry.Type.DEBIT, amountCents);
                toLedger.append(LedgerEntry.Type.CREDIT, amountCents);   // both entries, or neither
            }
        }

        TransferResult result = new TransferResult(amountCents);
        idempotency.put(idempotencyKey, result);
        return result;
    }
}