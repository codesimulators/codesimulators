import math
from driver import DriverStatus


class NoDriversAvailable(Exception):
    pass


class MatchingService:
    """Walks the nearest-first candidate list, atomically claiming one
    driver at a time. A claim that isn't accepted within the timeout is
    released and the NEXT candidate is tried — the rider is never stuck on
    one no-show."""

    def __init__(self, geo_index, drivers: dict):
        self._geo_index = geo_index
        self._drivers = drivers

    def find_and_claim(self, ride, respond) -> str:
        candidates = [self._drivers[did] for did in self._geo_index.nearby_driver_ids(ride.pickup_lat, ride.pickup_lng)]
        candidates = [d for d in candidates if d.status == DriverStatus.AVAILABLE]
        candidates.sort(key=lambda d: self._distance(d, ride))

        for driver in candidates:
            if driver.status != DriverStatus.AVAILABLE:
                continue  # lost the race to another request
            driver.status = DriverStatus.EN_ROUTE_TO_PICKUP  # atomic claim (compare-and-set)

            accepted = respond(driver.id)  # simulates the timeout-bounded ping
            if accepted:
                ride.assign_driver(driver.id)
                return driver.id
            driver.status = DriverStatus.AVAILABLE  # release — try the next candidate
        raise NoDriversAvailable()

    def _distance(self, driver, ride) -> float:
        return math.hypot(driver.lat - ride.pickup_lat, driver.lng - ride.pickup_lng)