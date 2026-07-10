import { VehicleType } from './VehicleType';

export class Vehicle {
    constructor(
        public readonly licensePlate: string,
        public readonly type: VehicleType,
    ) {}
}