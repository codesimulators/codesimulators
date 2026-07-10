import { OrderService } from './OrderService';
import { Courier } from './Courier';

const service = new OrderService();
service.registerCourier(new Courier('c1', 12.972, 77.595));

const order = service.placeOrder('cust-1', 'rest-1', 12.9716, 77.5946);

// Courier search starts here — the SAME moment the kitchen starts cooking.
service.onKitchenStartsPreparing(order, () => true);
console.log(service.trackingStatus(order));   // PREPARING / COURIER_ASSIGNED

service.onCourierArrived(order);
service.onKitchenReady(order);
console.log(service.trackingStatus(order));   // READY / ARRIVED

service.completePickup(order);
console.log(service.trackingStatus(order));   // READY / PICKED_UP