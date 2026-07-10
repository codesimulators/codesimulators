from state import State
from idle_state import IdleState
from dispensing_state import DispensingState

class HasMoneyState(State):
    """Money is in. Take more coins, or select a product."""

    def name(self) -> str: return "HAS_MONEY"

    def insert_coin(self, m, cents):
        m.balance += cents

    def select_product(self, m, pid):
        p = m.products.get(pid)
        if not p or p.stock == 0:
            return
        if m.balance < p.price:
            return
        m.selected = pid
        m.set_state(DispensingState())

    # dispense — inherited _reject handles it

    def refund(self, m):
        m.return_change(m.balance)
        m.balance = 0
        m.set_state(IdleState())