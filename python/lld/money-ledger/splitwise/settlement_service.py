from dataclasses import dataclass
from ledger import Ledger
from typing import List


@dataclass
class Transaction:
    from_id: str
    to_id: str
    amount_cents: int


class SettlementService:
    """Greedy minimum-cash-flow settlement: repeatedly match the largest
    debtor with the largest creditor. Provably minimal for netting a set
    of balances that already sums to zero."""

    def simplify(self, ledger: Ledger) -> List[Transaction]:
        net = ledger.get_net_balances()
        creditors = [[pid, amt] for pid, amt in net.items() if amt > 0]
        debtors = [[pid, -amt] for pid, amt in net.items() if amt < 0]

        txns: List[Transaction] = []
        while creditors and debtors:
            creditors.sort(key=lambda c: c[1], reverse=True)
            debtors.sort(key=lambda d: d[1], reverse=True)

            creditor, debtor = creditors[0], debtors[0]
            amount = min(creditor[1], debtor[1])

            txns.append(Transaction(debtor[0], creditor[0], amount))
            creditor[1] -= amount
            debtor[1] -= amount

            if creditor[1] == 0: creditors.pop(0)
            if debtor[1] == 0: debtors.pop(0)
        return txns