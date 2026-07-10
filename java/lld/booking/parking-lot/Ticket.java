// The reservation record. Created on entry, settled on exit.
public class Ticket {
    public final String id;
    public final Vehicle vehicle;
    public final ParkingSpot spot;
    public final long entryTime;
    public Long exitTime;
    public double fee;

    public Ticket(String id, Vehicle vehicle, ParkingSpot spot, long entryTime) {
        this.id = id; this.vehicle = vehicle; this.spot = spot; this.entryTime = entryTime;
    }
}