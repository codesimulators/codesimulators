// A driver's state machine. Only the matching service's atomic claim may
// move AVAILABLE -> EN_ROUTE_TO_PICKUP; every other transition is explicit.
public class Driver {
    public enum Status { OFFLINE, AVAILABLE, EN_ROUTE_TO_PICKUP, ON_TRIP }

    public final String id;
    public double lat, lng;
    public Status status = Status.OFFLINE;

    public Driver(String id, double lat, double lng) {
        this.id = id; this.lat = lat; this.lng = lng;
    }
}