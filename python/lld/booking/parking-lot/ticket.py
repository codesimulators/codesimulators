from typing import Optional
from vehicle import Vehicle
from spot import ParkingSpot


# The reservation record. Created on entry, settled on exit.
class Ticket:
    def __init__(self, ticket_id: str, vehicle: Vehicle,
                 spot: ParkingSpot, entry_time: float):
        self.id = ticket_id
        self.vehicle = vehicle
        self.spot = spot
        self.entry_time = entry_time
        self.exit_time: Optional[float] = None
        self.fee: float = 0.0