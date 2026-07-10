from __future__ import annotations
from abc import ABC, abstractmethod


class ATMState(ABC):
    """Each action defaults to 'not allowed here'; concrete states override
    only the actions that are LEGAL in their mode."""

    def __init__(self, atm: "ATM"):
        self.atm = atm

    def insert_card(self): self._reject("insert card")
    def enter_pin(self, pin: str): self._reject("enter PIN")
    def withdraw(self, amount: int): self._reject("withdraw")
    def eject_card(self): self._reject("eject card")

    @abstractmethod
    def name(self) -> str: ...

    def _reject(self, action: str):
        print(f"  x cannot {action} while {self.name()}")