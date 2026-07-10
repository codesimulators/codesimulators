export type RideStatus = 'REQUESTED' | 'DRIVER_ASSIGNED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

// The lifecycle of one trip — always queryable, never guessed.
export class Ride {
    status: RideStatus = 'REQUESTED';
    driverId?: string;
    fareMultiplier = 1.0;

    constructor(readonly id: string, readonly riderId: string, readonly pickupLat: number, readonly pickupLng: number) {}

    assignDriver(driverId: string): void { this.driverId = driverId; this.status = 'DRIVER_ASSIGNED'; }
    start(): void { this.status = 'IN_PROGRESS'; }
    complete(): void { this.status = 'COMPLETED'; }
    cancel(): void { this.status = 'CANCELLED'; }
}