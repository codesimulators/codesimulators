from state import State
from idle_state import IdleState

class DispensingState(State):
    """Busy vending — reject input; only dispense() completes the sale."""

    def name(self) -> str: return "DISPENSING"

    def insert_coin(self, m, cents): m.return_change(cents)

    # select_product — inherited _reject handles it

    def dispense(self, m):
        p = m.products[m.selected]
        p.stock -= 1
        change = m.balance - p.price
        if change > 0: m.return_change(change)
        m.balance = 0
        m.selected = None
        m.set_state(IdleState())

    # refund — inherited _reject handles it