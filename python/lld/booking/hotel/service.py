import threading
from typing import Dict, List, Optional
from enums import RoomType, ReservationStatus
from models import Room, DateRange, Reservation
from pricing import PricingStrategy


# Orchestrator. Answers the interval-overlap availability question.
class HotelService:
    def __init__(self, rooms: List[Room], pricing: PricingStrategy):
        self._rooms = rooms
        self._pricing = pricing
        self._reservations: Dict[str, Reservation] = {}
        self._counter = 0
        self._lock = threading.Lock()

    def _is_free(self, room_number: str, date_range: DateRange) -> bool:
        for r in self._reservations.values():
            if (r.room_number == room_number
                    and r.status != ReservationStatus.CANCELLED
                    and r.range.overlaps(date_range)):
                return False
        return True

    def search(self, room_type: RoomType, date_range: DateRange) -> List[Room]:
        return [room for room in self._rooms
                if room.type == room_type and self._is_free(room.number, date_range)]

    # BOOK — atomic find-then-hold for overlapping dates.
    def book(self, guest_id: str, room_type: RoomType,
             date_range: DateRange) -> Optional[Reservation]:
        with self._lock:
            room = next((r for r in self._rooms
                         if r.type == room_type and self._is_free(r.number, date_range)), None)
            if room is None:
                return None
            amount = self._pricing.per_night(room) * date_range.nights()
            self._counter += 1
            res = Reservation(f"R{self._counter}", room.number, guest_id, date_range, amount)
            self._reservations[res.id] = res
            return res

    def confirm(self, reservation_id: str) -> bool:
        with self._lock:
            res = self._reservations.get(reservation_id)
            if res is None or res.status != ReservationStatus.HELD:
                return False
            res.status = ReservationStatus.CONFIRMED
            return True