import math
from abc import ABC, abstractmethod
from models import Loan


# Strategy: overdue fine rule is pluggable.
class FineStrategy(ABC):
    @abstractmethod
    def compute(self, loan: Loan, returned_at: float) -> float: ...


class PerDayFine(FineStrategy):
    def __init__(self, per_day: float):
        self.per_day = per_day

    def compute(self, loan: Loan, returned_at: float) -> float:
        overdue = returned_at - loan.due_at
        if overdue <= 0:
            return 0.0
        return math.ceil(overdue / 86_400_000) * self.per_day