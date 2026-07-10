from abc import ABC, abstractmethod

class State(ABC):
    """Each action defaults to 'not allowed here'; concrete states override
    only the actions that are LEGAL in their mode."""

    def insert_coin(self, m, cents): self._reject("insert coin")
    def select_product(self, m, pid): self._reject("select product")
    def dispense(self, m): self._reject("dispense")
    def refund(self, m): self._reject("refund")

    @abstractmethod
    def name(self) -> str: ...

    def _reject(self, action: str):
        print(f"  x cannot {action} while {self.name()}")