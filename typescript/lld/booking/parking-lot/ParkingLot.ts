import { ParkingFloor } from './ParkingFloor';
import { Ticket } from './Ticket';
import { Vehicle } from './Vehicle';
import { FeeStrategy } from './FeeStrategy';

// Orchestrator. Owns the inventory + active reservations + pricing.
export class ParkingLot {
    private readonly active = new Map<string, Ticket>();
    private counter = 0;

    constructor(
        private readonly floors: ParkingFloor[],
        private readonly feeStrategy: FeeStrategy,
    ) {}

    // ENTRY — reserve a spot and issue a ticket.
    // The find-then-assign pair MUST be atomic (one lock / critical section)
    // so two vehicles can never be handed the same spot.
    park(vehicle: Vehicle, now: number = Date.now()): Ticket | null {
        for (const floor of this.floors) {
            const spot = floor.findFreeSpot(vehicle);
            if (spot) {
                spot.assign(vehicle);                       // find + assign must be one atomic step (JS is single-threaded, so here it already is)
                const ticket = new Ticket('T' + (++this.counter), vehicle, spot, now);
                this.active.set(ticket.id, ticket);
                return ticket;
            }
        }
        return null;  // no fitting spot — lot full for this vehicle type
    }

    // EXIT — settle the fee and release the spot back to inventory.
    unpark(ticketId: string, now: number = Date.now()): number {
        const ticket = this.active.get(ticketId);
        if (!ticket) throw new Error('Unknown ticket: ' + ticketId);
        ticket.exitTime = now;
        ticket.fee = this.feeStrategy.compute(ticket.entryTime, now);
        ticket.spot.release();
        this.active.delete(ticketId);
        return ticket.fee;
    }

    availability(): number {
        return this.floors.reduce((sum, f) => sum + f.freeCount(), 0);
    }
}