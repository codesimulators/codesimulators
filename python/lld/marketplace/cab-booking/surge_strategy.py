from abc import ABC, abstractmethod


class SurgeStrategy(ABC):
    """Strategy: turn (open requests, available drivers) in a zone into a
    price multiplier. Swappable independent of the matching logic itself."""

    @abstractmethod
    def multiplier(self, open_requests: int, available_drivers: int) -> float: ...