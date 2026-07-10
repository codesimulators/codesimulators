import threading
from typing import Dict, List, Optional
from enums import SeatStatus, BookingStatus
from show import Show
from pricing import PricingStrategy
from booking import Booking

HOLD_MS = 5 * 60 * 1000   # holds live 5 minutes


# Orchestrator. A lock makes the hold atomic so two users can't hold a seat.
class BookingService:
    def __init__(self, shows: Dict[str, Show], pricing: PricingStrategy):
        self._shows = shows
        self._pricing = pricing
        self._bookings: Dict[str, Booking] = {}
        self._counter = 0
        self._lock = threading.Lock()

    def search_shows(self, movie_title: str) -> List[Show]:
        return [s for s in self._shows.values() if s.movie_title == movie_title]

    # HOLD — all-or-nothing, atomic.
    def hold_seats(self, user_id: str, show_id: str,
                   seat_ids: List[str], now: float) -> Optional[Booking]:
        with self._lock:
            show = self._shows.get(show_id)
            if show is None:
                return None
            seats = [show.seats.get(i) for i in seat_ids]
            if any(s is None or not s.is_free(now) for s in seats):
                return None                      # any taken → abort
            amount = 0.0
            for s in seats:
                s.status = SeatStatus.HELD
                s.held_by = user_id
                s.hold_expires_at = now + HOLD_MS
                amount += self._pricing.price(s)
            self._counter += 1
            b = Booking(f"B{self._counter}", user_id, show_id, seat_ids, amount)
            self._bookings[b.id] = b
            return b

    # CONFIRM — HELD -> BOOKED, only by the holder, only if not expired.
    def confirm_booking(self, booking_id: str, now: float) -> bool:
        with self._lock:
            b = self._bookings.get(booking_id)
            if b is None or b.status != BookingStatus.PENDING:
                return False
            show = self._shows[b.show_id]
            for i in b.seat_ids:
                seat = show.seats[i]
                if (seat.status != SeatStatus.HELD or seat.held_by != b.user_id
                        or now > seat.hold_expires_at):
                    return False
            for i in b.seat_ids:
                show.seats[i].status = SeatStatus.BOOKED
            b.status = BookingStatus.CONFIRMED
            return True