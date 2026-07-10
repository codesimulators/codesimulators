import math
from abc import ABC, abstractmethod


# Strategy: pricing is pluggable without touching the lot.
class FeeStrategy(ABC):
    @abstractmethod
    def compute(self, entry_time: float, exit_time: float) -> float: ...


class HourlyFeeStrategy(FeeStrategy):
    def __init__(self, rate_per_hour: float):
        self.rate_per_hour = rate_per_hour

    def compute(self, entry_time: float, exit_time: float) -> float:
        hours = math.ceil((exit_time - entry_time) / 3_600_000)  # ms -> h
        return max(1, hours) * self.rate_per_hour                # min 1h