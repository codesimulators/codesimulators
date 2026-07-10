from idempotency_store import IdempotencyStore
from ledger import Ledger
from transfer_service import TransferService, InsufficientFunds
from wallet import Wallet


class WalletManager:
    """Facade — the only class callers touch. Coordinates wallets, ledgers,
    idempotency and the transfer service; owns no business logic itself."""

    def __init__(self):
        self._wallets = {}
        self._ledgers = {}
        self._idempotency = IdempotencyStore()
        self._transfer_service = TransferService(self._idempotency)

    def open(self, id: str, owner: str) -> Wallet:
        wallet = Wallet(id, owner)
        self._wallets[id] = wallet
        self._ledgers[id] = Ledger()
        return wallet

    def add_money(self, wallet_id: str, amount_cents: int, idempotency_key: str) -> None:
        if self._idempotency.get(idempotency_key) is not None:
            return
        self._ledger_of(wallet_id).append("CREDIT", amount_cents)
        self._idempotency.put(idempotency_key, {"status": "OK"})

    def pay(self, wallet_id: str, amount_cents: int, idempotency_key: str) -> None:
        if self._idempotency.get(idempotency_key) is not None:
            return
        ledger = self._ledger_of(wallet_id)
        if ledger.get_balance() < amount_cents:
            raise InsufficientFunds()
        ledger.append("DEBIT", amount_cents)
        self._idempotency.put(idempotency_key, {"status": "OK"})

    def transfer(self, from_id: str, to_id: str, amount_cents: int, idempotency_key: str):
        return self._transfer_service.transfer(
            from_id, self._ledger_of(from_id), to_id, self._ledger_of(to_id), amount_cents, idempotency_key
        )

    def get_balance(self, wallet_id: str) -> int:
        return self._ledger_of(wallet_id).get_balance()

    def _ledger_of(self, wallet_id: str) -> Ledger:
        if wallet_id not in self._ledgers:
            raise KeyError(f"unknown wallet {wallet_id}")
        return self._ledgers[wallet_id]