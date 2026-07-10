public class Reservation {
    public final String id, roomNumber, guestId;
    public final DateRange range;
    public final double amount;
    public ReservationStatus status = ReservationStatus.HELD;
    public Reservation(String id, String roomNumber, String guestId, DateRange range, double amount) {
        this.id = id; this.roomNumber = roomNumber; this.guestId = guestId;
        this.range = range; this.amount = amount;
    }
}