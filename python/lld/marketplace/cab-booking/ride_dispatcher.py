from driver import DriverStatus
from geo_index import GeoIndex
from matching_service import MatchingService
from ride import Ride


class RideDispatcher:
    """Facade — the only class callers touch. Coordinates the geo index,
    matching and surge pricing; owns no matching logic itself."""

    def __init__(self, surge):
        self._drivers = {}
        self._geo_index = GeoIndex()
        self._matching = MatchingService(self._geo_index, self._drivers)
        self._surge = surge
        self._next_ride_id = 1

    def register_driver(self, driver) -> None:
        driver.status = DriverStatus.AVAILABLE
        self._drivers[driver.id] = driver
        self._geo_index.upsert(driver)

    def request_ride(self, rider_id: str, pickup_lat: float, pickup_lng: float, respond) -> Ride:
        ride = Ride(f"r{self._next_ride_id}", rider_id, pickup_lat, pickup_lng)
        self._next_ride_id += 1
        open_requests = 1  # demo: one live request in this zone
        available = sum(1 for d in self._drivers.values() if d.status == DriverStatus.AVAILABLE)
        ride.fare_multiplier = self._surge.multiplier(open_requests, available)

        self._matching.find_and_claim(ride, respond)
        return ride