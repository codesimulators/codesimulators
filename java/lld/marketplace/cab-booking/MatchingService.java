import java.util.List;
import java.util.Map;
import java.util.function.Predicate;
import java.util.stream.Collectors;

public class MatchingService {

    public static class NoDriversAvailable extends RuntimeException {}

    private final GeoIndex geoIndex;
    private final Map<String, Driver> drivers;

    public MatchingService(GeoIndex geoIndex, Map<String, Driver> drivers) {
        this.geoIndex = geoIndex;
        this.drivers = drivers;
    }

    // Walks the nearest-first candidate list, atomically claiming one driver
    // at a time. A claim that isn't accepted within the timeout is released
    // and the NEXT candidate is tried — the rider is never stuck on one no-show.
    public String findAndClaim(Ride ride, Predicate<String> respond) {
        List<Driver> candidates = geoIndex.nearbyDriverIds(ride.pickupLat, ride.pickupLng).stream()
            .map(drivers::get)
            .filter(d -> d.status == Driver.Status.AVAILABLE)
            .sorted((a, b) -> Double.compare(distance(a, ride), distance(b, ride)))
            .collect(Collectors.toList());

        for (Driver driver : candidates) {
            if (driver.status != Driver.Status.AVAILABLE) continue;   // lost the race to another request
            driver.status = Driver.Status.EN_ROUTE_TO_PICKUP;          // atomic claim (compare-and-set)

            boolean accepted = respond.test(driver.id);                 // simulates the timeout-bounded ping
            if (accepted) {
                ride.assignDriver(driver.id);
                return driver.id;
            }
            driver.status = Driver.Status.AVAILABLE;                    // release — try the next candidate
        }
        throw new NoDriversAvailable();
    }

    private double distance(Driver driver, Ride ride) {
        return Math.hypot(driver.lat - ride.pickupLat, driver.lng - ride.pickupLng);
    }
}