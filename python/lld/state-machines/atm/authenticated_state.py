from atm_state import ATMState
from idle_state import IdleState


class AuthenticatedState(ATMState):
    """Withdraw (guarded by balance AND cash) or eject."""

    def name(self) -> str:
        return "AUTHENTICATED"

    def withdraw(self, amount: int):
        if amount > self.atm.balance:
            print("  x insufficient funds"); return
        if amount > self.atm.cash:
            print("  x machine low on cash"); return
        self.atm.debit(amount)
        self.atm.dispense(amount)          # transient DISPENSING step
        print(f"  -> dispensed ${amount}, card returned")
        self.atm.set_state(IdleState(self.atm))

    def eject_card(self):
        print("  -> card returned")
        self.atm.set_state(IdleState(self.atm))