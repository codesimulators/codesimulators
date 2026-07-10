from enum import Enum


class DriverStatus(Enum):
    """A driver's state machine. Only the matching service's atomic claim
    may move AVAILABLE -> EN_ROUTE_TO_PICKUP; every other transition is
    explicit."""
    OFFLINE = "OFFLINE"
    AVAILABLE = "AVAILABLE"
    EN_ROUTE_TO_PICKUP = "EN_ROUTE_TO_PICKUP"
    ON_TRIP = "ON_TRIP"


class Driver:
    def __init__(self, id: str, lat: float, lng: float):
        self.id = id
        self.lat = lat
        self.lng = lng
        self.status = DriverStatus.OFFLINE