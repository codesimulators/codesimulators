import { RideDispatcher } from './RideDispatcher';
import { Driver } from './Driver';
import { DemandSupplySurge } from './DemandSupplySurge';

const dispatcher = new RideDispatcher(new DemandSupplySurge());
dispatcher.registerDriver(new Driver('d1', 12.971, 77.594));   // 0.4km from pickup
dispatcher.registerDriver(new Driver('d2', 12.975, 77.598));   // 0.9km from pickup

// d1 never answers (simulated no-show); d2 accepts.
const ride = dispatcher.requestRide('rider-9', 12.9716, 77.5946, driverId => driverId !== 'd1');

console.log(ride.status, ride.driverId, ride.fareMultiplier);
// DRIVER_ASSIGNED d2 1