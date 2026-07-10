from atm_state import ATMState
from idle_state import IdleState
from authenticated_state import AuthenticatedState


class HasCardState(ATMState):
    """Enter a PIN (three tries) or eject. Cannot withdraw yet."""

    def __init__(self, atm):
        super().__init__(atm)
        self._tries = 0

    def name(self) -> str:
        return "HAS_CARD"

    def enter_pin(self, pin: str):
        if self.atm.validate_pin(pin):
            print("  -> PIN ok, authenticated")
            self.atm.set_state(AuthenticatedState(self.atm))
            return
        self._tries += 1
        if self._tries >= 3:
            print("  x 3 wrong PINs - card retained")
            self.atm.set_state(IdleState(self.atm))
        else:
            print(f"  x wrong PIN ({self._tries}/3)")

    def eject_card(self):
        print("  -> card returned")
        self.atm.set_state(IdleState(self.atm))