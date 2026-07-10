from typing import List, Optional, Dict
from vehicle_type import VehicleType
from spot_type import SpotType
from spot import ParkingSpot
from vehicle import Vehicle

# Which spot types a vehicle may use, smallest acceptable first.
FITS: Dict[VehicleType, List[SpotType]] = {
    VehicleType.MOTORCYCLE: [SpotType.MOTORCYCLE, SpotType.COMPACT, SpotType.LARGE],
    VehicleType.CAR:        [SpotType.COMPACT, SpotType.LARGE],
    VehicleType.TRUCK:      [SpotType.LARGE],
}


class ParkingFloor:
    def __init__(self, floor: int, spots: List[ParkingSpot]):
        self.floor = floor
        self._spots = spots

    # Availability search: first free spot whose type fits the vehicle.
    def find_free_spot(self, vehicle: Vehicle) -> Optional[ParkingSpot]:
        for spot_type in FITS[vehicle.type]:
            for s in self._spots:
                if s.type == spot_type and s.is_free():
                    return s
        return None

    def free_count(self) -> int:
        return sum(1 for s in self._spots if s.is_free())