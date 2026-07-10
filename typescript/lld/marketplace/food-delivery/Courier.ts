export type CourierAvailability = 'OFFLINE' | 'AVAILABLE' | 'EN_ROUTE_TO_PICKUP' | 'ON_DELIVERY';

// Same shape as Cab Booking's Driver — the matching machinery is reused,
// not reinvented, for a completely different kind of trip.
export class Courier {
    status: CourierAvailability = 'OFFLINE';
    constructor(readonly id: string, public lat: number, public lng: number) {}
}