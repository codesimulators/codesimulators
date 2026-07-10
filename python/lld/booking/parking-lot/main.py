import time
from lot import ParkingLot
from floor import ParkingFloor
from spot import ParkingSpot
from vehicle import Vehicle
from vehicle_type import VehicleType
from spot_type import SpotType
from fee_strategy import HourlyFeeStrategy

HOUR = 3_600_000  # ms


def main():
    lot = ParkingLot(
        [ParkingFloor(0, [
            ParkingSpot("F0-C1", 0, SpotType.COMPACT),
            ParkingSpot("F0-L1", 0, SpotType.LARGE),
        ])],
        HourlyFeeStrategy(2),  # $2 / hour
    )

    entry = time.time() * 1000
    car = Vehicle("KA-01-1234", VehicleType.CAR)
    truck = Vehicle("KA-02-9999", VehicleType.TRUCK)

    # A car fits a compact; a truck fits ONLY a large.
    car_ticket = lot.park(car, entry)
    print("Car parked at", car_ticket.spot.id)                # F0-C1
    print("Truck parked at", lot.park(truck, entry).spot.id)  # F0-L1
    print("Free spots:", lot.availability())                  # 0

    # A second truck fits nowhere — refused.
    second = lot.park(Vehicle("KA-03-0000", VehicleType.TRUCK), entry)
    print("Parked" if second else "Refused - no large spot free")  # Refused

    fee = lot.unpark(car_ticket.id, entry + 3 * HOUR)
    print("Car fee: $" + str(fee))                            # 3h * $2 = 6
    print("Free spots:", lot.availability())                  # 1


if __name__ == "__main__":
    main()