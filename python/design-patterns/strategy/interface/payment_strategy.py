from abc import ABC, abstractmethod

class PaymentStrategy(ABC):
    @abstractmethod
    def charge(self, amount: float) -> float:
        """Given an amount, return the total the buyer pays."""
        ...