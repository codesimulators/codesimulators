import { Driver } from './Driver';
import { GeoIndex } from './GeoIndex';
import { Ride } from './Ride';

export class NoDriversAvailable extends Error {}

// Walks the nearest-first candidate list, atomically claiming one driver at
// a time. A claim that isn't accepted within the timeout is released and
// the NEXT candidate is tried — the rider is never stuck on one no-show.
export class MatchingService {
    constructor(private geoIndex: GeoIndex, private drivers: Map<string, Driver>) {}

    findAndClaim(ride: Ride, respond: (driverId: string) => boolean): string {
        const candidates = this.geoIndex.nearbyDriverIds(ride.pickupLat, ride.pickupLng)
            .map(id => this.drivers.get(id)!)
            .filter(d => d.status === 'AVAILABLE')
            .sort((a, b) => this.distance(a, ride) - this.distance(b, ride));

        for (const driver of candidates) {
            if (driver.status !== 'AVAILABLE') continue;      // lost the race to another request
            driver.status = 'EN_ROUTE_TO_PICKUP';               // atomic claim (compare-and-set)

            const accepted = respond(driver.id);                // simulates the timeout-bounded ping
            if (accepted) {
                ride.assignDriver(driver.id);
                return driver.id;
            }
            driver.status = 'AVAILABLE';                        // release — try the next candidate
        }
        throw new NoDriversAvailable();
    }

    private distance(driver: Driver, ride: Ride): number {
        return Math.hypot(driver.lat - ride.pickupLat, driver.lng - ride.pickupLng);
    }
}