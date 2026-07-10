from enum import Enum


class CourierAvailability(Enum):
    """Same shape as Cab Booking's Driver — the matching machinery is
    reused, not reinvented, for a completely different kind of trip."""
    OFFLINE = "OFFLINE"
    AVAILABLE = "AVAILABLE"
    EN_ROUTE_TO_PICKUP = "EN_ROUTE_TO_PICKUP"
    ON_DELIVERY = "ON_DELIVERY"


class Courier:
    def __init__(self, id: str, lat: float, lng: float):
        self.id = id
        self.lat = lat
        self.lng = lng
        self.status = CourierAvailability.OFFLINE