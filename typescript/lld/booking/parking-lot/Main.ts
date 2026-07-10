import { ParkingLot } from './ParkingLot';
import { ParkingFloor } from './ParkingFloor';
import { ParkingSpot } from './ParkingSpot';
import { Vehicle } from './Vehicle';
import { VehicleType } from './VehicleType';
import { SpotType } from './SpotType';
import { HourlyFeeStrategy } from './FeeStrategy';

const HOUR = 3_600_000;

// A tiny lot: floor 0 with one compact + one large spot.
const lot = new ParkingLot(
    [new ParkingFloor(0, [
        new ParkingSpot('F0-C1', 0, SpotType.COMPACT),
        new ParkingSpot('F0-L1', 0, SpotType.LARGE),
    ])],
    new HourlyFeeStrategy(2),  // $2 / hour
);

const entry = Date.now();
const car = new Vehicle('KA-01-1234', VehicleType.CAR);
const truck = new Vehicle('KA-02-9999', VehicleType.TRUCK);

// A car fits a compact; a truck fits ONLY a large.
const carTicket = lot.park(car, entry);
console.log(carTicket ? 'Car parked at ' + carTicket.spot.id : 'Lot full');   // F0-C1
console.log('Truck parked at ' + lot.park(truck, entry)?.spot.id);            // F0-L1
console.log('Free spots: ' + lot.availability());                             // 0

// A second truck fits nowhere — refused, and the gate stays down.
const second = lot.park(new Vehicle('KA-03-0000', VehicleType.TRUCK), entry);
console.log(second ? 'Parked' : 'Refused — no large spot free');              // Refused

// ...3 hours later the car leaves...
const fee = lot.unpark(carTicket!.id, entry + 3 * HOUR);
console.log('Car fee: $' + fee);                                              // 3h * $2 = $6
console.log('Free spots: ' + lot.availability());                            // 1