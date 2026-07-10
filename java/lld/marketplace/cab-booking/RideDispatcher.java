import java.util.HashMap;
import java.util.Map;
import java.util.function.Predicate;

// Facade — the only class callers touch. Coordinates the geo index,
// matching and surge pricing; owns no matching logic itself.
public class RideDispatcher {
    private final Map<String, Driver> drivers = new HashMap<>();
    private final GeoIndex geoIndex = new GeoIndex();
    private final MatchingService matching = new MatchingService(geoIndex, drivers);
    private final SurgeStrategy surge;
    private int nextRideId = 1;

    public RideDispatcher(SurgeStrategy surge) { this.surge = surge; }

    public void registerDriver(Driver driver) {
        driver.status = Driver.Status.AVAILABLE;
        drivers.put(driver.id, driver);
        geoIndex.upsert(driver);
    }

    public Ride requestRide(String riderId, double pickupLat, double pickupLng, Predicate<String> respond) {
        Ride ride = new Ride("r" + (nextRideId++), riderId, pickupLat, pickupLng);
        int openRequests = 1;                                              // demo: one live request in this zone
        long available = drivers.values().stream().filter(d -> d.status == Driver.Status.AVAILABLE).count();
        ride.fareMultiplier = surge.multiplier(openRequests, (int) available);

        matching.findAndClaim(ride, respond);
        return ride;
    }
}