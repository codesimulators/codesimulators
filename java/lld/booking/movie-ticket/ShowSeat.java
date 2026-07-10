// Inventory unit. Knows its status + who holds it and until when.
public class ShowSeat {
    public final String id;
    public final SeatType type;
    public SeatStatus status = SeatStatus.AVAILABLE;
    public String heldBy;
    public long holdExpiresAt;

    public ShowSeat(String id, SeatType type) { this.id = id; this.type = type; }

    public boolean isFree(long now) {
        if (status == SeatStatus.HELD && now > holdExpiresAt) return true;
        return status == SeatStatus.AVAILABLE;
    }
}