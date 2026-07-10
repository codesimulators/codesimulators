import { Driver } from './Driver';
import { GeoIndex } from './GeoIndex';
import { MatchingService } from './MatchingService';
import { Ride } from './Ride';
import { SurgeStrategy } from './SurgeStrategy';

// Facade — the only class callers touch. Coordinates the geo index,
// matching and surge pricing; owns no matching logic itself.
export class RideDispatcher {
    private drivers = new Map<string, Driver>();
    private geoIndex = new GeoIndex();
    private matching = new MatchingService(this.geoIndex, this.drivers);
    private nextRideId = 1;

    constructor(private surge: SurgeStrategy) {}

    registerDriver(driver: Driver): void {
        driver.status = 'AVAILABLE';
        this.drivers.set(driver.id, driver);
        this.geoIndex.upsert(driver);
    }

    requestRide(riderId: string, pickupLat: number, pickupLng: number, respond: (driverId: string) => boolean): Ride {
        const ride = new Ride(`r${this.nextRideId++}`, riderId, pickupLat, pickupLng);
        const openRequests = 1;                                            // demo: one live request in this zone
        const available = [...this.drivers.values()].filter(d => d.status === 'AVAILABLE').length;
        ride.fareMultiplier = this.surge.multiplier(openRequests, available);

        this.matching.findAndClaim(ride, respond);
        return ride;
    }
}