from atm_state import ATMState
from has_card_state import HasCardState


class IdleState(ATMState):
    """Only legal move is to insert a card."""

    def name(self) -> str:
        return "IDLE"

    def insert_card(self):
        print("  -> card accepted")
        self.atm.set_state(HasCardState(self.atm))