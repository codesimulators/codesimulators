import time
from enums import RoomType
from models import Room, DateRange
from pricing import SeasonalPricing
from service import HotelService


def main():
    DAY = 86_400_000
    t0 = time.time() * 1000
    svc = HotelService(
        [Room("101", RoomType.DELUXE), Room("102", RoomType.DELUXE)],
        SeasonalPricing({RoomType.STANDARD: 80, RoomType.DELUXE: 140, RoomType.SUITE: 300}),
    )

    res = svc.book("g1", RoomType.DELUXE, DateRange(t0, t0 + 3 * DAY))
    print("Booked " + res.room_number + " for $" + str(res.amount) if res else "Sold out")
    res2 = svc.book("g2", RoomType.DELUXE, DateRange(t0 + DAY, t0 + 2 * DAY))
    print("g2 room:", res2.room_number if res2 else "none")   # 102
    print("Confirm g1:", svc.confirm(res.id))


if __name__ == "__main__":
    main()