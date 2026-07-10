import { Courier } from './Courier';
import { Order } from './Order';

export class NoCouriersAvailable extends Error {}

// The exact same candidate-cascade shape as Cab Booking's MatchingService —
// reused wholesale, just matching couriers to a restaurant instead of
// drivers to a rider. Candidates arrive pre-sorted nearest-first (the same
// GeoIndex from Cab Booking would produce this list in a real deployment).
export class MatchingService {
    findAndClaim(order: Order, candidates: Courier[], respond: (courierId: string) => boolean): string {
        for (const courier of candidates) {
            if (courier.status !== 'AVAILABLE') continue;      // lost the race to another order
            courier.status = 'EN_ROUTE_TO_PICKUP';               // atomic claim (compare-and-set)

            const accepted = respond(courier.id);                // simulates the timeout-bounded ping
            if (accepted) {
                order.assignCourier(courier.id);
                return courier.id;
            }
            courier.status = 'AVAILABLE';                        // release — try the next candidate
        }
        throw new NoCouriersAvailable();
    }
}