from abc import ABC, abstractmethod
from typing import Dict
from enums import RoomType
from models import Room


# Strategy: nightly rate is pluggable.
class PricingStrategy(ABC):
    @abstractmethod
    def per_night(self, room: Room) -> float: ...


class SeasonalPricing(PricingStrategy):
    def __init__(self, rates: Dict[RoomType, float]):
        self.rates = rates

    def per_night(self, room: Room) -> float:
        return self.rates[room.type]