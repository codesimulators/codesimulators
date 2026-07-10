public class Main {
    public static void main(String[] args) {
        RideDispatcher dispatcher = new RideDispatcher(new DemandSupplySurge());
        dispatcher.registerDriver(new Driver("d1", 12.971, 77.594));   // 0.4km from pickup
        dispatcher.registerDriver(new Driver("d2", 12.975, 77.598));   // 0.9km from pickup

        // d1 never answers (simulated no-show); d2 accepts.
        Ride ride = dispatcher.requestRide("rider-9", 12.9716, 77.5946, driverId -> !driverId.equals("d1"));

        System.out.println(ride.status + " " + ride.driverId + " " + ride.fareMultiplier);
        // DRIVER_ASSIGNED d2 1.0
    }
}