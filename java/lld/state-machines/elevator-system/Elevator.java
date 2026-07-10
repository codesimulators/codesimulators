import java.util.*;

// The FSM context. It never decides WHICH floor to serve, or whether a hall
// call matches the direction it's heading — those live here, not in the
// scheduler. It only asks the scheduler where to go next. Nobody outside
// this class ever drives it directly: requestPickup/selectDestination wake
// an internal timer loop that keeps ticking until the car settles.
public class Elevator {
    private static final long TICK_MS = 100;   // pacing only

    private int floor = 0;
    private Direction.Travel direction = Direction.Travel.IDLE;
    private Direction.Door door = Direction.Door.CLOSED;
    private final Map<Integer, Direction.Travel> calls = new HashMap<>();   // hall calls: floor -> requested direction
    private final Set<Integer> destinations = new HashSet<>();             // car calls: where a boarded rider is headed
    private Integer boarding = null;                                       // floor where a rider just got on
    private final Scheduler scheduler;
    private final Timer timer = new Timer(true);                          // daemon: never blocks JVM exit on its own
    private boolean driving = false;

    public Elevator(Scheduler scheduler) { this.scheduler = scheduler; }

    // A hall call: someone waiting at 'floor', wanting to go 'direction'.
    public synchronized void requestPickup(int floor, Direction.Travel direction) {
        calls.put(floor, direction);
        scheduler.add(floor);
        wake();
    }

    // A car call: a boarded rider's actual destination.
    public synchronized void selectDestination(int floor) {
        destinations.add(floor);
        scheduler.add(floor);
        boarding = null;
        wake();
    }

    // Starts the car ticking on its own if it isn't already — the only thing
    // a request does to make the car move.
    private void wake() {
        if (driving) return;
        driving = true;
        timer.schedule(new TimerTask() { public void run() { tick(); } }, TICK_MS);
    }

    private synchronized void tick() {
        System.out.println(step());
        boolean waitingOnRider = boarding != null;
        boolean settled = direction == Direction.Travel.IDLE && door == Direction.Door.CLOSED
            && calls.isEmpty() && destinations.isEmpty();
        if (waitingOnRider || settled) { driving = false; return; }   // nothing to do until woken again
        timer.schedule(new TimerTask() { public void run() { tick(); } }, TICK_MS);
    }

    // One atomic action: move a floor, open/close a door, or go idle.
    private String step() {
        if (boarding != null) return "floor " + floor + ": boarding, awaiting destination";
        if (door == Direction.Door.OPEN) {
            door = Direction.Door.CLOSED;
            return "floor " + floor + ": doors closed";
        }

        Direction.Travel hallDir = calls.get(floor);
        boolean hallMatches = hallDir != null && (direction == Direction.Travel.IDLE || hallDir == direction);
        boolean destHere = destinations.contains(floor);

        if (hallMatches || destHere) {
            if (hallMatches) { calls.remove(floor); scheduler.remove(floor); boarding = floor; }
            if (destHere) { destinations.remove(floor); scheduler.remove(floor); }
            door = Direction.Door.OPEN;
            return "floor " + floor + ": doors OPEN" + (hallMatches ? ", boarding" : ", dropped off");
        }
        // a mismatched hall call (wants DOWN while we're headed UP, say) is
        // simply left pending — it'll match once the car reverses

        Integer target = scheduler.next(floor, direction);
        if (target == null) {
            direction = Direction.Travel.IDLE;
            return "floor " + floor + ": idle";
        }

        Direction.Travel nextDirection = target > floor ? Direction.Travel.UP : Direction.Travel.DOWN;
        if (nextDirection != direction && direction != Direction.Travel.IDLE) {
            // Reversing: settle the new direction but don't move yet, so the
            // very next tick re-checks hallMatches against it — otherwise the
            // car can sail straight past a floor it should've stopped at.
            direction = nextDirection;
            return "floor " + floor + ": reversing to " + nextDirection;
        }
        direction = nextDirection;
        floor += direction == Direction.Travel.UP ? 1 : -1;
        return "reached floor " + floor;
    }
}