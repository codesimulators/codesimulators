import { Courier } from './Courier';
import { MatchingService } from './MatchingService';
import { Order } from './Order';

// Facade — coordinates both sub-machines and the matching service. Kicks
// off courier search on PREPARING, not READY — the whole point of the design.
export class OrderService {
    private orders = new Map<string, Order>();
    private couriers = new Map<string, Courier>();
    private matching = new MatchingService();
    private nextOrderId = 1;

    registerCourier(courier: Courier): void {
        courier.status = 'AVAILABLE';
        this.couriers.set(courier.id, courier);
    }

    placeOrder(customerId: string, restaurantId: string, restaurantLat: number, restaurantLng: number): Order {
        const order = new Order(`o${this.nextOrderId++}`, customerId, restaurantId, restaurantLat, restaurantLng);
        this.orders.set(order.id, order);
        return order;
    }

    // Called the moment the kitchen starts cooking — NOT when the food is
    // ready. This is what makes the two timelines overlap.
    onKitchenStartsPreparing(order: Order, respond: (courierId: string) => boolean): void {
        order.startPreparing();
        const candidates = [...this.couriers.values()]
            .filter(c => c.status === 'AVAILABLE')
            .sort((a, b) => this.distance(a, order) - this.distance(b, order));
        this.matching.findAndClaim(order, candidates, respond);
    }

    onKitchenReady(order: Order): void { order.markReady(); }
    onCourierArrived(order: Order): void { order.courierArrived(); }
    completePickup(order: Order): void { order.pickUp(); }
    trackingStatus(order: Order): string { return order.trackingStatus(); }

    private distance(courier: Courier, order: Order): number {
        return Math.hypot(courier.lat - order.restaurantLat, courier.lng - order.restaurantLng);
    }
}