from abc import ABC, abstractmethod
from typing import Dict
from enums import SeatType
from show_seat import ShowSeat


# Strategy: pricing pluggable without touching the service.
class PricingStrategy(ABC):
    @abstractmethod
    def price(self, seat: ShowSeat) -> float: ...


class TieredPricing(PricingStrategy):
    def __init__(self, rates: Dict[SeatType, float]):
        self.rates = rates

    def price(self, seat: ShowSeat) -> float:
        return self.rates[seat.type]