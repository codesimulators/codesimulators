import java.util.HashMap;
import java.util.Map;

// Facade — the only class callers touch. Coordinates wallets, ledgers,
// idempotency and the transfer service; owns no business logic itself.
public class WalletManager {
    private final Map<String, Wallet> wallets = new HashMap<>();
    private final Map<String, Ledger> ledgers = new HashMap<>();
    private final IdempotencyStore idempotency = new IdempotencyStore();
    private final TransferService transferService = new TransferService(idempotency);

    public Wallet open(String id, String owner) {
        Wallet wallet = new Wallet(id, owner);
        wallets.put(id, wallet);
        ledgers.put(id, new Ledger());
        return wallet;
    }

    public void addMoney(String walletId, long amountCents, String idempotencyKey) {
        if (idempotency.get(idempotencyKey) != null) return;
        ledgerOf(walletId).append(LedgerEntry.Type.CREDIT, amountCents);
        idempotency.put(idempotencyKey, "OK");
    }

    public void pay(String walletId, long amountCents, String idempotencyKey) {
        if (idempotency.get(idempotencyKey) != null) return;
        Ledger ledger = ledgerOf(walletId);
        if (ledger.getBalance() < amountCents) throw new TransferService.InsufficientFunds();
        ledger.append(LedgerEntry.Type.DEBIT, amountCents);
        idempotency.put(idempotencyKey, "OK");
    }

    public TransferService.TransferResult transfer(String fromId, String toId, long amountCents, String idempotencyKey) {
        return transferService.transfer(fromId, ledgerOf(fromId), toId, ledgerOf(toId), amountCents, idempotencyKey);
    }

    public long getBalance(String walletId) { return ledgerOf(walletId).getBalance(); }

    private Ledger ledgerOf(String walletId) {
        Ledger ledger = ledgers.get(walletId);
        if (ledger == null) throw new IllegalArgumentException("unknown wallet " + walletId);
        return ledger;
    }
}