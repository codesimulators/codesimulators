import java.util.*;

public class ParkingFloor {
    // Which spot types a vehicle may use, smallest acceptable first.
    private static final Map<VehicleType, List<SpotType>> FITS = Map.of(
        VehicleType.MOTORCYCLE, List.of(SpotType.MOTORCYCLE, SpotType.COMPACT, SpotType.LARGE),
        VehicleType.CAR,        List.of(SpotType.COMPACT, SpotType.LARGE),
        VehicleType.TRUCK,      List.of(SpotType.LARGE)
    );

    public final int floor;
    private final List<ParkingSpot> spots;

    public ParkingFloor(int floor, List<ParkingSpot> spots) {
        this.floor = floor; this.spots = spots;
    }

    // Availability search: first free spot whose type fits the vehicle.
    public ParkingSpot findFreeSpot(Vehicle vehicle) {
        for (SpotType type : FITS.get(vehicle.type)) {
            for (ParkingSpot s : spots) {
                if (s.type == type && s.isFree()) return s;
            }
        }
        return null;
    }

    public int freeCount() {
        int n = 0;
        for (ParkingSpot s : spots) if (s.isFree()) n++;
        return n;
    }
}