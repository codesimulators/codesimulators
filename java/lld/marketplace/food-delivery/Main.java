public class Main {
    public static void main(String[] args) {
        OrderService service = new OrderService();
        service.registerCourier(new Courier("c1", 12.972, 77.595));

        Order order = service.placeOrder("cust-1", "rest-1", 12.9716, 77.5946);

        // Courier search starts here — the SAME moment the kitchen starts cooking.
        service.onKitchenStartsPreparing(order, id -> true);
        System.out.println(service.trackingStatus(order));   // PREPARING / COURIER_ASSIGNED

        service.onCourierArrived(order);
        service.onKitchenReady(order);
        System.out.println(service.trackingStatus(order));   // READY / ARRIVED

        service.completePickup(order);
        System.out.println(service.trackingStatus(order));   // READY / PICKED_UP
    }
}