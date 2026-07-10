from enum import Enum, auto


class RoomType(Enum):
    STANDARD = auto()
    DELUXE = auto()
    SUITE = auto()


class ReservationStatus(Enum):
    HELD = auto()
    CONFIRMED = auto()
    CANCELLED = auto()