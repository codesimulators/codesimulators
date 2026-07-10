// Deliberately holds no balance field — the ledger is the only source of
// truth for how much a wallet has.
public class Wallet {
    public final String id;
    public final String owner;
    public Wallet(String id, String owner) { this.id = id; this.owner = owner; }
}