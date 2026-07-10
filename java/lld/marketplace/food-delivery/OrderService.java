import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Predicate;
import java.util.stream.Collectors;

// Facade — coordinates both sub-machines and the matching service. Kicks
// off courier search on PREPARING, not READY — the whole point of the design.
public class OrderService {
    private final Map<String, Order> orders = new HashMap<>();
    private final Map<String, Courier> couriers = new HashMap<>();
    private final MatchingService matching = new MatchingService();
    private int nextOrderId = 1;

    public void registerCourier(Courier courier) {
        courier.status = Courier.Status.AVAILABLE;
        couriers.put(courier.id, courier);
    }

    public Order placeOrder(String customerId, String restaurantId, double restaurantLat, double restaurantLng) {
        Order order = new Order("o" + (nextOrderId++), customerId, restaurantId, restaurantLat, restaurantLng);
        orders.put(order.id, order);
        return order;
    }

    // Called the moment the kitchen starts cooking — NOT when the food is
    // ready. This is what makes the two timelines overlap.
    public void onKitchenStartsPreparing(Order order, Predicate<String> respond) {
        order.startPreparing();
        List<Courier> candidates = couriers.values().stream()
            .filter(c -> c.status == Courier.Status.AVAILABLE)
            .sorted((a, b) -> Double.compare(distance(a, order), distance(b, order)))
            .collect(Collectors.toList());
        matching.findAndClaim(order, candidates, respond);
    }

    public void onKitchenReady(Order order) { order.markReady(); }
    public void onCourierArrived(Order order) { order.courierArrived(); }
    public void completePickup(Order order) { order.pickUp(); }
    public String trackingStatus(Order order) { return order.trackingStatus(); }

    private double distance(Courier courier, Order order) {
        return Math.hypot(courier.lat - order.restaurantLat, courier.lng - order.restaurantLng);
    }
}