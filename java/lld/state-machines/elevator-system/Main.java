public class Main {
    public static void main(String[] args) throws InterruptedException {
        Elevator lift = new Elevator(new LookScheduler());

        // That's the whole API — press a button and the car drives itself.
        // No loop to write, no tick to call: requestPickup/selectDestination
        // wake an internal 100ms timer that logs each arrival until the car
        // settles idle.

        lift.requestPickup(5, Direction.Travel.DOWN);   // lobby — 5▼
        // lift.selectDestination(0);                    // car — floor 0

        Thread.sleep(2000);   // the timer is a daemon thread — keep main alive to see it run
    }
}