// The aggregate. Two INDEPENDENT sub-statuses live on one order; only
// pickUp() ever reads both together, and only to guard the one transition
// that truly depends on both.
public class Order {
    public final String id, customerId, restaurantId;
    public final double restaurantLat, restaurantLng;
    public PreparationStatus prepStatus = PreparationStatus.RECEIVED;
    public DeliveryStatus deliveryStatus = DeliveryStatus.UNASSIGNED;
    public String courierId;

    public Order(String id, String customerId, String restaurantId, double restaurantLat, double restaurantLng) {
        this.id = id; this.customerId = customerId; this.restaurantId = restaurantId;
        this.restaurantLat = restaurantLat; this.restaurantLng = restaurantLng;
    }

    public void startPreparing() { prepStatus = PreparationStatus.PREPARING; deliveryStatus = DeliveryStatus.SEARCHING; }
    public void markReady() { prepStatus = PreparationStatus.READY; }

    public void assignCourier(String courierId) { this.courierId = courierId; deliveryStatus = DeliveryStatus.COURIER_ASSIGNED; }
    public void courierArrived() { deliveryStatus = DeliveryStatus.ARRIVED; }

    public void pickUp() {
        if (prepStatus != PreparationStatus.READY) throw new IllegalStateException("food not ready yet");
        if (deliveryStatus != DeliveryStatus.ARRIVED) throw new IllegalStateException("courier not here yet");
        deliveryStatus = DeliveryStatus.PICKED_UP;
    }

    public void deliver() { deliveryStatus = DeliveryStatus.DELIVERED; }

    public void cancel() {
        if (deliveryStatus == DeliveryStatus.PICKED_UP || deliveryStatus == DeliveryStatus.DELIVERED) {
            throw new IllegalStateException("too late to cancel");
        }
        prepStatus = PreparationStatus.CANCELLED;
        deliveryStatus = DeliveryStatus.CANCELLED;
    }

    public String trackingStatus() { return prepStatus + " / " + deliveryStatus; }
}