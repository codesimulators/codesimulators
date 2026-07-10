import java.util.*;

public class Main {
    public static void main(String[] args) {
        long HOUR = 3_600_000L;

        ParkingLot lot = new ParkingLot(
            List.of(new ParkingFloor(0, List.of(
                new ParkingSpot("F0-C1", 0, SpotType.COMPACT),
                new ParkingSpot("F0-L1", 0, SpotType.LARGE)
            ))),
            new HourlyFeeStrategy(2)  // $2 / hour
        );

        long entry = System.currentTimeMillis();
        Vehicle car = new Vehicle("KA-01-1234", VehicleType.CAR);
        Vehicle truck = new Vehicle("KA-02-9999", VehicleType.TRUCK);

        // A car fits a compact; a truck fits ONLY a large.
        Ticket carTicket = lot.park(car, entry);
        System.out.println("Car parked at " + carTicket.spot.id);                     // F0-C1
        System.out.println("Truck parked at " + lot.park(truck, entry).spot.id);      // F0-L1
        System.out.println("Free spots: " + lot.availability());                      // 0

        // A second truck fits nowhere — refused.
        Ticket second = lot.park(new Vehicle("KA-03-0000", VehicleType.TRUCK), entry);
        System.out.println(second != null ? "Parked" : "Refused - no large spot free"); // Refused

        double fee = lot.unpark(carTicket.id, entry + 3 * HOUR);
        System.out.println("Car fee: $" + fee);                                       // 3h * $2 = 6.0
        System.out.println("Free spots: " + lot.availability());                      // 1
    }
}