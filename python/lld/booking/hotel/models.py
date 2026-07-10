from enums import RoomType, ReservationStatus


# Half-open interval [check_in, check_out). Checkout day frees the room.
class DateRange:
    def __init__(self, check_in: float, check_out: float):
        if check_out <= check_in:
            raise ValueError("check_out must be after check_in")
        self.check_in = check_in
        self.check_out = check_out

    # The one line the whole design turns on:
    def overlaps(self, other: "DateRange") -> bool:
        return self.check_in < other.check_out and other.check_in < self.check_out

    def nights(self) -> int:
        return round((self.check_out - self.check_in) / 86_400_000)


class Room:
    def __init__(self, number: str, room_type: RoomType):
        self.number = number
        self.type = room_type


class Reservation:
    def __init__(self, res_id: str, room_number: str, guest_id: str,
                 date_range: DateRange, amount: float):
        self.id = res_id
        self.room_number = room_number
        self.guest_id = guest_id
        self.range = date_range
        self.amount = amount
        self.status = ReservationStatus.HELD