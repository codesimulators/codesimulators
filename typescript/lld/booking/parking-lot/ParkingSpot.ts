import { SpotType } from './SpotType';
import { Vehicle } from './Vehicle';

// One bookable unit of inventory. Knows only whether it is free.
export class ParkingSpot {
    private vehicle: Vehicle | null = null;

    constructor(
        public readonly id: string,
        public readonly floor: number,
        public readonly type: SpotType,
    ) {}

    isFree(): boolean { return this.vehicle === null; }
    assign(v: Vehicle): void { this.vehicle = v; }   // the "hold"
    release(): void { this.vehicle = null; }         // the "release"
}