export type DriverStatus = 'OFFLINE' | 'AVAILABLE' | 'EN_ROUTE_TO_PICKUP' | 'ON_TRIP';

// A driver's state machine. Only the matching service's atomic claim may
// move AVAILABLE -> EN_ROUTE_TO_PICKUP; every other transition is explicit.
export class Driver {
    status: DriverStatus = 'OFFLINE';
    constructor(readonly id: string, public lat: number, public lng: number) {}
}