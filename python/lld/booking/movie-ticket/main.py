import time
from show import Show
from show_seat import ShowSeat
from enums import SeatType
from pricing import TieredPricing
from service import BookingService


def main():
    seats = {
        "A1": ShowSeat("A1", SeatType.PREMIUM),
        "A2": ShowSeat("A2", SeatType.PREMIUM),
        "B1": ShowSeat("B1", SeatType.REGULAR),
    }
    show = Show("S1", "Dune", "Screen 1", time.time() * 1000 + 3_600_000, seats)
    svc = BookingService(
        {show.id: show},
        TieredPricing({SeatType.REGULAR: 200, SeatType.PREMIUM: 350}),
    )

    now = time.time() * 1000
    b = svc.hold_seats("u1", "S1", ["A1", "A2"], now)
    print("Held for $" + str(b.amount) if b else "Seats gone")
    print("u2 hold A1:", "ok" if svc.hold_seats("u2", "S1", ["A1"], now) else "rejected")
    print("Confirm:", svc.confirm_booking(b.id, now))


if __name__ == "__main__":
    main()