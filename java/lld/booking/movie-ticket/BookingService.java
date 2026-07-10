import java.util.*;

// Orchestrator. 'synchronized' makes the hold atomic so two users can never
// hold the same seat.
public class BookingService {
    private static final long HOLD_MS = 5 * 60 * 1000;
    private final Map<String, Show> shows;
    private final PricingStrategy pricing;
    private final Map<String, Booking> bookings = new HashMap<>();
    private int counter = 0;

    public BookingService(Map<String, Show> shows, PricingStrategy pricing) {
        this.shows = shows; this.pricing = pricing;
    }

    public List<Show> searchShows(String movieTitle) {
        List<Show> out = new ArrayList<>();
        for (Show s : shows.values()) if (s.movieTitle.equals(movieTitle)) out.add(s);
        return out;
    }

    // HOLD — all-or-nothing, atomic.
    public synchronized Booking holdSeats(String userId, String showId,
                                          List<String> seatIds, long now) {
        Show show = shows.get(showId);
        if (show == null) return null;

        List<ShowSeat> seats = new ArrayList<>();
        for (String id : seatIds) {
            ShowSeat seat = show.seats.get(id);
            if (seat == null || !seat.isFree(now)) return null;   // any taken → abort
            seats.add(seat);
        }
        double amount = 0;
        for (ShowSeat seat : seats) {
            seat.status = SeatStatus.HELD; seat.heldBy = userId;
            seat.holdExpiresAt = now + HOLD_MS;
            amount += pricing.price(seat);
        }
        Booking b = new Booking("B" + (++counter), userId, showId, seatIds, amount);
        bookings.put(b.id, b);
        return b;
    }

    // CONFIRM — HELD -> BOOKED, only by the holder, only if not expired.
    public synchronized boolean confirmBooking(String bookingId, long now) {
        Booking b = bookings.get(bookingId);
        if (b == null || b.status != BookingStatus.PENDING) return false;
        Show show = shows.get(b.showId);
        for (String id : b.seatIds) {
            ShowSeat seat = show.seats.get(id);
            if (seat.status != SeatStatus.HELD || !userId(seat, b) || now > seat.holdExpiresAt)
                return false;
        }
        for (String id : b.seatIds) show.seats.get(id).status = SeatStatus.BOOKED;
        b.status = BookingStatus.CONFIRMED;
        return true;
    }

    private boolean userId(ShowSeat seat, Booking b) { return b.userId.equals(seat.heldBy); }
}