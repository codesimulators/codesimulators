from split import Split
from typing import List


class Expense:
    """Immutable once created — computing shares in __init__ is what makes
    it possible to reject a bad split BEFORE it ever touches the ledger."""

    def __init__(self, id: str, paid_by: str, total_cents: int, participant_ids: List[str], split: Split):
        self.id = id
        self.paid_by = paid_by
        self.total_cents = total_cents
        self.participant_ids = participant_ids
        self.shares = split.compute_shares(total_cents, participant_ids)