from enum import Enum
from recipe import MENU
from inventory import Inventory


class State(Enum):
    IDLE = "IDLE"
    SELECTED = "SELECTED"
    PAID = "PAID"


class CoffeeMachine:
    """FSM: each method is a guarded transition; failures refund."""

    def __init__(self, inventory: Inventory):
        self._inv = inventory
        self._state = State.IDLE
        self._selected = None
        self._paid = 0

    def select(self, key: str) -> str:
        if self._state is not State.IDLE:
            return self._deny("select")
        r = MENU.get(key)
        if r is None:
            return "no such drink"
        if not self._inv.can_make(r):
            return "out of: " + ", ".join(self._inv.missing(r))
        self._selected, self._state = r, State.SELECTED
        return f"selected {r.name} - insert {r.price_cents}c"

    def pay(self, cents: int) -> str:
        if self._state is not State.SELECTED:
            return self._deny("pay")
        self._paid += cents
        if self._paid < self._selected.price_cents:
            return f"need {self._selected.price_cents - self._paid}c more"
        self._state = State.PAID
        return "payment ok - press brew"

    def brew(self) -> str:
        if self._state is not State.PAID:
            return self._deny("brew")
        r = self._selected
        if not self._inv.can_make(r):
            return self._refund("ingredient ran out")
        self._inv.consume(r)
        change = self._paid - r.price_cents
        self._reset()
        return f"brewed {r.name}. change: {change}c"

    def cancel(self) -> str:
        return self._refund("cancelled") if self._paid > 0 else "cancelled"

    def _refund(self, reason: str) -> str:
        amt = self._paid
        self._reset()
        return f"{reason} - refunded {amt}c"

    def _deny(self, action: str) -> str:
        return f"cannot {action} while {self._state.value}"

    def _reset(self):
        self._state, self._selected, self._paid = State.IDLE, None, 0