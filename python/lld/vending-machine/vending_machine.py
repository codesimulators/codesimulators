from threading import Lock
from idle_state import IdleState

class Product:
    def __init__(self, price, stock):
        self.price = price
        self.stock = stock

class VendingMachine:
    """The CONTEXT — one lock makes the whole machine thread-safe."""

    def __init__(self, products):
        self._state = IdleState()
        self._lock = Lock()
        self.balance = 0
        self.selected = None
        self.products = products

    def set_state(self, s): self._state = s
    def return_change(self, cents): print(f"return {cents}c")

    def insert_coin(self, cents):
        with self._lock: self._state.insert_coin(self, cents)

    def select_product(self, pid):
        with self._lock: self._state.select_product(self, pid)

    def dispense(self):
        with self._lock: self._state.dispense(self)

    def refund(self):
        with self._lock: self._state.refund(self)