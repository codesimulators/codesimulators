import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

// Append-only per-wallet log. Balance is a fold over the entries, kept as
// a running cache so getBalance() doesn't replay the whole history — but
// the cache is only ever UPDATED by append(), never set directly.
public class Ledger {
    private final List<LedgerEntry> entries = new ArrayList<>();
    private long cachedBalance = 0;

    public void append(LedgerEntry.Type type, long amountCents) {
        entries.add(new LedgerEntry(type, amountCents, System.currentTimeMillis()));
        cachedBalance += type == LedgerEntry.Type.CREDIT ? amountCents : -amountCents;
    }

    public long getBalance() { return cachedBalance; }

    public List<LedgerEntry> history() { return Collections.unmodifiableList(entries); }
}