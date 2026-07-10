import java.util.*;

// Orchestrator. Owns the inventory + active reservations + pricing.
public class ParkingLot {
    private final List<ParkingFloor> floors;
    private final FeeStrategy feeStrategy;
    private final Map<String, Ticket> active = new HashMap<>();
    private int counter = 0;

    public ParkingLot(List<ParkingFloor> floors, FeeStrategy feeStrategy) {
        this.floors = floors; this.feeStrategy = feeStrategy;
    }

    // ENTRY — reserve a spot and issue a ticket. 'synchronized' makes the
    // find-then-assign atomic so two cars never get the same spot.
    public synchronized Ticket park(Vehicle vehicle, long now) {
        for (ParkingFloor floor : floors) {
            ParkingSpot spot = floor.findFreeSpot(vehicle);
            if (spot != null) {
                spot.assign(vehicle);                       // atomic because park() is synchronized — the lock, not assign(), is what makes it safe
                Ticket ticket = new Ticket("T" + (++counter), vehicle, spot, now);
                active.put(ticket.id, ticket);
                return ticket;
            }
        }
        return null;  // lot full for this vehicle type
    }

    // EXIT — settle the fee and release the spot.
    public synchronized double unpark(String ticketId, long now) {
        Ticket ticket = active.get(ticketId);
        if (ticket == null) throw new NoSuchElementException("Unknown ticket: " + ticketId);
        ticket.exitTime = now;
        ticket.fee = feeStrategy.compute(ticket.entryTime, now);
        ticket.spot.release();
        active.remove(ticketId);
        return ticket.fee;
    }

    public int availability() {
        int n = 0;
        for (ParkingFloor f : floors) n += f.freeCount();
        return n;
    }
}