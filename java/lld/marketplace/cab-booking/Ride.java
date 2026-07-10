// The lifecycle of one trip — always queryable, never guessed.
public class Ride {
    public enum Status { REQUESTED, DRIVER_ASSIGNED, IN_PROGRESS, COMPLETED, CANCELLED }

    public final String id, riderId;
    public final double pickupLat, pickupLng;
    public Status status = Status.REQUESTED;
    public String driverId;
    public double fareMultiplier = 1.0;

    public Ride(String id, String riderId, double pickupLat, double pickupLng) {
        this.id = id; this.riderId = riderId; this.pickupLat = pickupLat; this.pickupLng = pickupLng;
    }

    public void assignDriver(String driverId) { this.driverId = driverId; status = Status.DRIVER_ASSIGNED; }
    public void start() { status = Status.IN_PROGRESS; }
    public void complete() { status = Status.COMPLETED; }
    public void cancel() { status = Status.CANCELLED; }
}