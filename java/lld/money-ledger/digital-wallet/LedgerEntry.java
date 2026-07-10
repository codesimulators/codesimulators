// An immutable fact: this wallet was credited/debited this many cents.
public class LedgerEntry {
    public enum Type { CREDIT, DEBIT }

    public final Type type;
    public final long amountCents;
    public final long timestamp;

    public LedgerEntry(Type type, long amountCents, long timestamp) {
        this.type = type;
        this.amountCents = amountCents;
        this.timestamp = timestamp;
    }
}