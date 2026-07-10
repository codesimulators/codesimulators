from collections import defaultdict


class GeoIndex:
    """A coarse geohash-lite: bucket drivers into 0.01-degree grid cells so
    a lookup only scans the rider's cell + its 8 neighbours, never the
    whole driver table."""

    CELL_SIZE = 0.01

    def __init__(self):
        self._cells = defaultdict(set)
        self._driver_cell = {}

    def _key_for(self, lat: float, lng: float):
        return (int(lat // self.CELL_SIZE), int(lng // self.CELL_SIZE))

    def upsert(self, driver) -> None:
        key = self._key_for(driver.lat, driver.lng)
        prev = self._driver_cell.get(driver.id)
        if prev == key:
            return
        if prev is not None:
            self._cells[prev].discard(driver.id)
        self._cells[key].add(driver.id)
        self._driver_cell[driver.id] = key

    def nearby_driver_ids(self, lat: float, lng: float):
        cx, cy = self._key_for(lat, lng)
        ids = set()
        for dx in (-1, 0, 1):
            for dy in (-1, 0, 1):
                ids |= self._cells.get((cx + dx, cy + dy), set())
        return ids