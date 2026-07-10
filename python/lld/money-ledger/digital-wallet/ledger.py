import threading
import time
from ledger_entry import LedgerEntry


class Ledger:
    """Append-only per-wallet log. Balance is a fold over the entries, kept
    as a running cache so get_balance() doesn't replay the whole history —
    but the cache is only ever UPDATED by append(), never set directly."""

    def __init__(self):
        self._entries = []
        self._cached_balance = 0
        self.lock = threading.Lock()

    def append(self, entry_type: str, amount_cents: int) -> None:
        self._entries.append(LedgerEntry(entry_type, amount_cents, time.time()))
        self._cached_balance += amount_cents if entry_type == "CREDIT" else -amount_cents

    def get_balance(self) -> int:
        return self._cached_balance

    def history(self):
        return list(self._entries)