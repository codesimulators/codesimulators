import java.util.*;

// The SCHEDULING POLICY, isolated from the car (LOOK algorithm). It only
// ever sees floor numbers — not which are pickups, drop-offs, or which way
// a hall call wants to go; that distinction lives entirely in Elevator.
public interface Scheduler {
    void add(int floor);
    void remove(int floor);
    boolean hasWork();
    Integer next(int current, Direction.Travel dir);   // null = nothing to do
}

class LookScheduler implements Scheduler {
    private final TreeSet<Integer> targets = new TreeSet<>();   // sorted — higher()/lower() are O(log n)

    public void add(int floor) { targets.add(floor); }
    public void remove(int floor) { targets.remove(floor); }
    public boolean hasWork() { return !targets.isEmpty(); }

    public Integer next(int current, Direction.Travel dir) {
        Integer above = targets.higher(current);   // smallest strictly > current
        Integer below = targets.lower(current);    // largest strictly < current
        if (dir == Direction.Travel.DOWN) return below != null ? below : above;
        return above != null ? above : below;      // UP/IDLE: prefer continuing up
    }
}