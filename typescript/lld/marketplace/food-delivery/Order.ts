import { PreparationStatus } from './PreparationStatus';
import { DeliveryStatus } from './DeliveryStatus';

// The aggregate. Two INDEPENDENT sub-statuses live on one order; only
// pickUp() ever reads both together, and only to guard the one transition
// that truly depends on both.
export class Order {
    prepStatus: PreparationStatus = 'RECEIVED';
    deliveryStatus: DeliveryStatus = 'UNASSIGNED';
    courierId?: string;

    constructor(
        readonly id: string,
        readonly customerId: string,
        readonly restaurantId: string,
        readonly restaurantLat: number,
        readonly restaurantLng: number,
    ) {}

    startPreparing(): void { this.prepStatus = 'PREPARING'; this.deliveryStatus = 'SEARCHING'; }
    markReady(): void { this.prepStatus = 'READY'; }

    assignCourier(courierId: string): void { this.courierId = courierId; this.deliveryStatus = 'COURIER_ASSIGNED'; }
    courierArrived(): void { this.deliveryStatus = 'ARRIVED'; }

    pickUp(): void {
        if (this.prepStatus !== 'READY') throw new Error('food not ready yet');
        if (this.deliveryStatus !== 'ARRIVED') throw new Error('courier not here yet');
        this.deliveryStatus = 'PICKED_UP';
    }

    deliver(): void { this.deliveryStatus = 'DELIVERED'; }

    cancel(): void {
        if (this.deliveryStatus === 'PICKED_UP' || this.deliveryStatus === 'DELIVERED') {
            throw new Error('too late to cancel');
        }
        this.prepStatus = 'CANCELLED';
        this.deliveryStatus = 'CANCELLED';
    }

    trackingStatus(): string {
        return `${this.prepStatus} / ${this.deliveryStatus}`;
    }
}