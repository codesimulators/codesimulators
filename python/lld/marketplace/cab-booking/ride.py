from enum import Enum


class RideStatus(Enum):
    """The lifecycle of one trip — always queryable, never guessed."""
    REQUESTED = "REQUESTED"
    DRIVER_ASSIGNED = "DRIVER_ASSIGNED"
    IN_PROGRESS = "IN_PROGRESS"
    COMPLETED = "COMPLETED"
    CANCELLED = "CANCELLED"


class Ride:
    def __init__(self, id: str, rider_id: str, pickup_lat: float, pickup_lng: float):
        self.id = id
        self.rider_id = rider_id
        self.pickup_lat = pickup_lat
        self.pickup_lng = pickup_lng
        self.status = RideStatus.REQUESTED
        self.driver_id = None
        self.fare_multiplier = 1.0

    def assign_driver(self, driver_id: str) -> None:
        self.driver_id = driver_id
        self.status = RideStatus.DRIVER_ASSIGNED

    def start(self) -> None: self.status = RideStatus.IN_PROGRESS
    def complete(self) -> None: self.status = RideStatus.COMPLETED
    def cancel(self) -> None: self.status = RideStatus.CANCELLED