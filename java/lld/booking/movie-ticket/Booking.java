import java.util.List;

public class Booking {
    public final String id, userId, showId;
    public final List<String> seatIds;
    public final double amount;
    public BookingStatus status = BookingStatus.PENDING;

    public Booking(String id, String userId, String showId,
                   List<String> seatIds, double amount) {
        this.id = id; this.userId = userId; this.showId = showId;
        this.seatIds = seatIds; this.amount = amount;
    }
}