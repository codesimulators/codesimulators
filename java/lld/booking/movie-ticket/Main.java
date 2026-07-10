import java.util.*;

public class Main {
    public static void main(String[] args) {
        Map<String, ShowSeat> seats = new LinkedHashMap<>();
        seats.put("A1", new ShowSeat("A1", SeatType.PREMIUM));
        seats.put("A2", new ShowSeat("A2", SeatType.PREMIUM));
        seats.put("B1", new ShowSeat("B1", SeatType.REGULAR));
        Show show = new Show("S1", "Dune", "Screen 1",
                             System.currentTimeMillis() + 3_600_000, seats);

        Map<SeatType, Double> rates = Map.of(SeatType.REGULAR, 200.0, SeatType.PREMIUM, 350.0);
        BookingService svc = new BookingService(
            Map.of(show.id, show), new TieredPricing(rates));

        long now = System.currentTimeMillis();
        Booking b = svc.holdSeats("u1", "S1", List.of("A1", "A2"), now);
        System.out.println(b != null ? "Held for $" + b.amount : "Seats gone");
        System.out.println("u2 hold A1: " +
            (svc.holdSeats("u2", "S1", List.of("A1"), now) != null ? "ok" : "rejected"));
        System.out.println("Confirm: " + svc.confirmBooking(b.id, now));
    }
}