from dataclasses import dataclass


@dataclass(frozen=True)
class LedgerEntry:
    """An immutable fact: this wallet was credited/debited this many cents."""
    type: str          # "CREDIT" | "DEBIT"
    amount_cents: int
    timestamp: float