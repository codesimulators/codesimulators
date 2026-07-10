import java.util.*;

public class Main {
    static int at(int h, int m) { return h * 60 + m; }

    public static void main(String[] args) {
        SchedulerService svc = new SchedulerService(
            List.of(new Room("R1", 6), new Room("R2", 12)));

        svc.book("R1", "alice", new TimeSlot(at(9, 0), at(10, 0)), 4);
        svc.book("R1", "bob",   new TimeSlot(at(10, 0), at(11, 0)), 3);

        System.out.println("overlap book: " +
            svc.book("R1", "carol", new TimeSlot(at(9, 30), at(10, 30)), 2));  // null

        TimeSlot s = svc.suggestNextSlot("R1", 30, at(9, 0), at(17, 0));
        System.out.println("next 30m slot: " + (s != null ? s.start + "-" + s.end : "none"));
    }
}