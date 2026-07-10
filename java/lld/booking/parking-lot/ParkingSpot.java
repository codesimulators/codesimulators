// One bookable unit of inventory. Knows only whether it is free.
public class ParkingSpot {
    public final String id;
    public final int floor;
    public final SpotType type;
    private Vehicle vehicle;

    public ParkingSpot(String id, int floor, SpotType type) {
        this.id = id; this.floor = floor; this.type = type;
    }

    public boolean isFree() { return vehicle == null; }
    public void assign(Vehicle v) { this.vehicle = v; } // the "hold"
    public void release() { this.vehicle = null; }      // the "release"
}