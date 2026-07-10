// Half-open interval [checkIn, checkOut). Checkout day frees the room.
public class DateRange {
    public final long checkIn, checkOut;
    public DateRange(long checkIn, long checkOut) {
        if (checkOut <= checkIn) throw new IllegalArgumentException("checkOut after checkIn");
        this.checkIn = checkIn; this.checkOut = checkOut;
    }
    // The one line the whole design turns on:
    public boolean overlaps(DateRange o) {
        return checkIn < o.checkOut && o.checkIn < checkOut;
    }
    public long nights() { return Math.round((checkOut - checkIn) / 86_400_000.0); }
}