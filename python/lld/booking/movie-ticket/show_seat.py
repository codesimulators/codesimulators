from enums import SeatType, SeatStatus


# Inventory unit. Knows its status + who holds it and until when.
class ShowSeat:
    def __init__(self, seat_id: str, seat_type: SeatType):
        self.id = seat_id
        self.type = seat_type
        self.status = SeatStatus.AVAILABLE
        self.held_by: str | None = None
        self.hold_expires_at = 0.0

    def is_free(self, now: float) -> bool:
        if self.status == SeatStatus.HELD and now > self.hold_expires_at:
            return True
        return self.status == SeatStatus.AVAILABLE