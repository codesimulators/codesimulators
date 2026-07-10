// Same shape as Cab Booking's Driver — the matching machinery is reused,
// not reinvented, for a completely different kind of trip.
public class Courier {
    public enum Status { OFFLINE, AVAILABLE, EN_ROUTE_TO_PICKUP, ON_DELIVERY }

    public final String id;
    public double lat, lng;
    public Status status = Status.OFFLINE;

    public Courier(String id, double lat, double lng) {
        this.id = id; this.lat = lat; this.lng = lng;
    }
}