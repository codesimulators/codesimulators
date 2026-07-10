from typing import List
from enums import BookingStatus


class Booking:
    def __init__(self, booking_id: str, user_id: str, show_id: str,
                 seat_ids: List[str], amount: float):
        self.id = booking_id
        self.user_id = user_id
        self.show_id = show_id
        self.seat_ids = seat_ids
        self.amount = amount
        self.status = BookingStatus.PENDING