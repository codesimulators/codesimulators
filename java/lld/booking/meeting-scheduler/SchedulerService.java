import java.util.*;

// Orchestrator. Each room's meetings kept sorted by start time.
public class SchedulerService {
    private final List<Room> rooms;
    private final Map<String, List<Meeting>> byRoom = new HashMap<>();
    private int counter = 0;

    public SchedulerService(List<Room> rooms) {
        this.rooms = rooms;
        for (Room r : rooms) byRoom.put(r.id, new ArrayList<>());
    }

    private boolean conflicts(String roomId, TimeSlot slot) {
        for (Meeting m : byRoom.get(roomId)) if (m.slot.overlaps(slot)) return true;
        return false;
    }

    // Atomic check-then-insert.
    public synchronized Meeting book(String roomId, String organizer, TimeSlot slot, int attendees) {
        Room room = rooms.stream().filter(r -> r.id.equals(roomId)).findFirst().orElse(null);
        if (room == null || attendees > room.capacity) return null;
        if (conflicts(roomId, slot)) return null;

        Meeting m = new Meeting("M" + (++counter), roomId, organizer, slot, attendees);
        List<Meeting> list = byRoom.get(roomId);
        list.add(m);
        list.sort(Comparator.comparingInt(x -> x.slot.start));
        return m;
    }

    public Room findRoom(TimeSlot slot, int attendees) {
        for (Room r : rooms)
            if (r.capacity >= attendees && !conflicts(r.id, slot)) return r;
        return null;
    }

    // SUGGEST — earliest gap of 'duration' in [from, until).
    public TimeSlot suggestNextSlot(String roomId, int duration, int from, int until) {
        int cursor = from;
        for (Meeting m : byRoom.get(roomId)) {
            if (m.slot.end <= cursor) continue;
            if (m.slot.start - cursor >= duration) return new TimeSlot(cursor, cursor + duration);
            cursor = Math.max(cursor, m.slot.end);
        }
        if (until - cursor >= duration) return new TimeSlot(cursor, cursor + duration);
        return null;
    }
}