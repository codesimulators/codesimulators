import { VehicleType } from './VehicleType';
import { SpotType } from './SpotType';
import { ParkingSpot } from './ParkingSpot';
import { Vehicle } from './Vehicle';

// Which spot types a vehicle may use, smallest acceptable first.
const FITS: Record<VehicleType, SpotType[]> = {
    [VehicleType.MOTORCYCLE]: [SpotType.MOTORCYCLE, SpotType.COMPACT, SpotType.LARGE],
    [VehicleType.CAR]:        [SpotType.COMPACT, SpotType.LARGE],
    [VehicleType.TRUCK]:      [SpotType.LARGE],
};

export class ParkingFloor {
    constructor(
        public readonly floor: number,
        private readonly spots: ParkingSpot[],
    ) {}

    // Availability search: first free spot whose type fits the vehicle.
    findFreeSpot(vehicle: Vehicle): ParkingSpot | null {
        for (const type of FITS[vehicle.type]) {
            const spot = this.spots.find(s => s.type === type && s.isFree());
            if (spot) return spot;
        }
        return null;
    }

    freeCount(): number {
        return this.spots.filter(s => s.isFree()).length;
    }
}