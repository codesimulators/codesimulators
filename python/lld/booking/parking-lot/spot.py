from typing import Optional
from spot_type import SpotType
from vehicle import Vehicle


# One bookable unit of inventory. Knows only whether it is free.
class ParkingSpot:
    def __init__(self, spot_id: str, floor: int, spot_type: SpotType):
        self.id = spot_id
        self.floor = floor
        self.type = spot_type
        self._vehicle: Optional[Vehicle] = None

    def is_free(self) -> bool:
        return self._vehicle is None

    def assign(self, v: Vehicle) -> None:   # the "hold"
        self._vehicle = v

    def release(self) -> None:              # the "release"
        self._vehicle = None