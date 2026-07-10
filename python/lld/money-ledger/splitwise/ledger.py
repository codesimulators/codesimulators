from collections import defaultdict
from expense import Expense
from typing import Dict, List


class Ledger:
    """Append-only. Net balance is NEVER stored — it's derived by replaying
    the log, so it can never drift out of sync with the history that
    produced it."""

    def __init__(self):
        self._expenses: List[Expense] = []

    def record(self, expense: Expense) -> None:
        self._expenses.append(expense)

    def get_net_balances(self) -> Dict[str, int]:
        net: Dict[str, int] = defaultdict(int)
        for e in self._expenses:
            net[e.paid_by] += e.total_cents
            for participant, share in e.shares.items():
                net[participant] -= share
        return dict(net)

    def history(self) -> List[Expense]:
        return self._expenses