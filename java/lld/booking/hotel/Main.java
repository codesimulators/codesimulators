import java.util.*;

public class Main {
    public static void main(String[] args) {
        long DAY = 86_400_000, t0 = System.currentTimeMillis();
        HotelService svc = new HotelService(
            List.of(new Room("101", RoomType.DELUXE), new Room("102", RoomType.DELUXE)),
            new SeasonalPricing(Map.of(RoomType.STANDARD, 80.0, RoomType.DELUXE, 140.0, RoomType.SUITE, 300.0)));

        Reservation res = svc.book("g1", RoomType.DELUXE, new DateRange(t0, t0 + 3 * DAY));
        System.out.println(res != null ? "Booked " + res.roomNumber + " for $" + res.amount : "Sold out");
        Reservation res2 = svc.book("g2", RoomType.DELUXE, new DateRange(t0 + DAY, t0 + 2 * DAY));
        System.out.println("g2 room: " + (res2 != null ? res2.roomNumber : "none"));  // 102
        System.out.println("Confirm g1: " + svc.confirm(res.id));
    }
}