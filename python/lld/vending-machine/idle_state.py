from state import State
from has_money_state import HasMoneyState

class IdleState(State):
    """Waiting for the first coin."""

    def name(self) -> str: return "IDLE"

    def insert_coin(self, m, cents):
        m.balance += cents
        m.set_state(HasMoneyState())

    # select_product, dispense, refund — inherited _reject handles them