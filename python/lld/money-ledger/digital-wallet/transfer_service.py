class InsufficientFunds(Exception):
    pass


class TransferResult:
    def __init__(self, amount_cents: int):
        self.status = "OK"
        self.amount_cents = amount_cents


class TransferService:
    """Debits one ledger and credits another as a single atomic step. The
    two ledgers' locks are acquired in a FIXED order (by wallet id) so a
    concurrent transfer running the opposite direction can never deadlock
    against this one."""

    def __init__(self, idempotency: "IdempotencyStore"):
        self._idempotency = idempotency

    def transfer(self, from_id, from_ledger, to_id, to_ledger, amount_cents, idempotency_key):
        cached = self._idempotency.get(idempotency_key)
        if cached is not None:
            return cached  # retry — do nothing new

        first, second = (from_ledger, to_ledger) if from_id < to_id else (to_ledger, from_ledger)
        with first.lock, second.lock:
            if from_ledger.get_balance() < amount_cents:
                raise InsufficientFunds()
            from_ledger.append("DEBIT", amount_cents)
            to_ledger.append("CREDIT", amount_cents)  # both entries, or neither

        result = TransferResult(amount_cents)
        self._idempotency.put(idempotency_key, result)
        return result