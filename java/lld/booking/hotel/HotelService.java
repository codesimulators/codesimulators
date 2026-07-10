import java.util.*;

// Orchestrator. Answers the interval-overlap availability question.
public class HotelService {
    private final List<Room> rooms;
    private final PricingStrategy pricing;
    private final Map<String, Reservation> reservations = new HashMap<>();
    private int counter = 0;

    public HotelService(List<Room> rooms, PricingStrategy pricing) {
        this.rooms = rooms; this.pricing = pricing;
    }

    // Free for 'range' iff no active reservation on the room overlaps.
    private boolean isFree(String roomNumber, DateRange range) {
        for (Reservation r : reservations.values())
            if (r.roomNumber.equals(roomNumber)
                && r.status != ReservationStatus.CANCELLED
                && r.range.overlaps(range))
                return false;
        return true;
    }

    public List<Room> search(RoomType type, DateRange range) {
        List<Room> out = new ArrayList<>();
        for (Room room : rooms)
            if (room.type == type && isFree(room.number, range)) out.add(room);
        return out;
    }

    // BOOK — atomic find-then-hold so two guests can't grab the same room
    // for overlapping dates.
    public synchronized Reservation book(String guestId, RoomType type, DateRange range) {
        Room room = null;
        for (Room r : rooms) if (r.type == type && isFree(r.number, range)) { room = r; break; }
        if (room == null) return null;

        double amount = pricing.perNight(room) * range.nights();
        Reservation res = new Reservation("R" + (++counter), room.number, guestId, range, amount);
        reservations.put(res.id, res);
        return res;
    }

    public synchronized boolean confirm(String reservationId) {
        Reservation res = reservations.get(reservationId);
        if (res == null || res.status != ReservationStatus.HELD) return false;
        res.status = ReservationStatus.CONFIRMED;
        return true;
    }
}