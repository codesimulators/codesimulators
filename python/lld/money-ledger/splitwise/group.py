from expense import Expense
from ledger import Ledger
from settlement_service import SettlementService, Transaction
from split import Split
from typing import Dict, List


class Group:
    """Facade — the only class callers touch. Coordinates users, the ledger
    and the settlement algorithm; owns no business logic of its own."""

    def __init__(self):
        self._ledger = Ledger()
        self._settlement = SettlementService()
        self._next_id = 1

    def add_expense(self, paid_by: str, total_cents: int, participant_ids: List[str], split: Split) -> Expense:
        expense = Expense(f"e{self._next_id}", paid_by, total_cents, participant_ids, split)
        self._next_id += 1
        self._ledger.record(expense)
        return expense

    def get_balances(self) -> Dict[str, int]:
        return self._ledger.get_net_balances()

    def simplify_debts(self) -> List[Transaction]:
        return self._settlement.simplify(self._ledger)