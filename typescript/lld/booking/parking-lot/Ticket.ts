import { Vehicle } from './Vehicle';
import { ParkingSpot } from './ParkingSpot';

// The reservation record. Created on entry, settled on exit.
export class Ticket {
    exitTime: number | null = null;
    fee = 0;

    constructor(
        public readonly id: string,
        public readonly vehicle: Vehicle,
        public readonly spot: ParkingSpot,
        public readonly entryTime: number,
    ) {}
}