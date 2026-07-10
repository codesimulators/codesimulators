import java.util.List;
import java.util.function.Predicate;

public class MatchingService {

    public static class NoCouriersAvailable extends RuntimeException {}

    // The exact same candidate-cascade shape as Cab Booking's
    // MatchingService — reused wholesale, just matching couriers to a
    // restaurant instead of drivers to a rider. Candidates arrive
    // pre-sorted nearest-first.
    public String findAndClaim(Order order, List<Courier> candidates, Predicate<String> respond) {
        for (Courier courier : candidates) {
            if (courier.status != Courier.Status.AVAILABLE) continue;   // lost the race to another order
            courier.status = Courier.Status.EN_ROUTE_TO_PICKUP;          // atomic claim (compare-and-set)

            boolean accepted = respond.test(courier.id);                  // simulates the timeout-bounded ping
            if (accepted) {
                order.assignCourier(courier.id);
                return courier.id;
            }
            courier.status = Courier.Status.AVAILABLE;                    // release — try the next candidate
        }
        throw new NoCouriersAvailable();
    }
}