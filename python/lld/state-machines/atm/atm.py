from idle_state import IdleState


class ATM:
    """The CONTEXT. Holds current state + data and delegates every action."""

    def __init__(self, cash: int = 500):
        self.balance = 800
        self.cash = cash
        self._pin = "1234"
        self._state = IdleState(self)

    def set_state(self, s): self._state = s
    def validate_pin(self, p: str) -> bool: return p == self._pin
    def debit(self, n: int): self.balance -= n
    def dispense(self, n: int): self.cash -= n

    # Public API — pure delegation, no mode conditionals.
    def insert_card(self):        self._log("insert_card"); self._state.insert_card()
    def enter_pin(self, pin: str): self._log("enter_pin");  self._state.enter_pin(pin)
    def withdraw(self, n: int):   self._log(f"withdraw {n}"); self._state.withdraw(n)
    def eject_card(self):         self._log("eject_card");  self._state.eject_card()

    def _log(self, a: str):
        print(f"[{self._state.name()}] {a}()")