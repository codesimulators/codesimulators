from enum import Enum, auto


class SeatType(Enum):
    REGULAR = auto()
    PREMIUM = auto()


# A seat's lifecycle for ONE show. HELD prevents double-booking.
class SeatStatus(Enum):
    AVAILABLE = auto()
    HELD = auto()
    BOOKED = auto()


class BookingStatus(Enum):
    PENDING = auto()
    CONFIRMED = auto()
    CANCELLED = auto()