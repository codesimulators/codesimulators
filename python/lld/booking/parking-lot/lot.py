import threading
from typing import List, Dict
from floor import ParkingFloor
from ticket import Ticket
from vehicle import Vehicle
from fee_strategy import FeeStrategy


# Orchestrator. Owns the inventory + active reservations + pricing.
class ParkingLot:
    def __init__(self, floors: List[ParkingFloor], fee_strategy: FeeStrategy):
        self._floors = floors
        self._fee = fee_strategy
        self._active: Dict[str, Ticket] = {}
        self._counter = 0
        self._lock = threading.Lock()   # make find-then-assign atomic

    # ENTRY — reserve a spot and issue a ticket.
    def park(self, vehicle: Vehicle, now: float) -> Ticket | None:
        with self._lock:                          # critical section
            for floor in self._floors:
                spot = floor.find_free_spot(vehicle)
                if spot:
                    spot.assign(vehicle)           # atomic because we hold self._lock across find + assign
                    self._counter += 1
                    ticket = Ticket(f"T{self._counter}", vehicle, spot, now)
                    self._active[ticket.id] = ticket
                    return ticket
            return None                            # lot full for this type

    # EXIT — settle the fee and release the spot.
    def unpark(self, ticket_id: str, now: float) -> float:
        with self._lock:
            ticket = self._active.get(ticket_id)
            if ticket is None:
                raise KeyError(f"Unknown ticket: {ticket_id}")
            ticket.exit_time = now
            ticket.fee = self._fee.compute(ticket.entry_time, now)
            ticket.spot.release()
            del self._active[ticket_id]
            return ticket.fee

    def availability(self) -> int:
        return sum(f.free_count() for f in self._floors)