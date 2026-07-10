import threading

from direction import Direction, DoorState

TICK_MS = 100   # pacing only -- one atomic action settles every 100ms


class Elevator:
    """The FSM context. It never decides WHICH floor to serve, or whether a
    hall call matches the direction it's heading -- those live here, not in
    the scheduler. It only asks the scheduler where to go next. Nobody
    outside this class ever drives it directly: request_pickup /
    select_destination wake an internal timer loop that keeps ticking until
    the car settles."""

    def __init__(self, scheduler):
        self._floor = 0
        self._dir = Direction.IDLE
        self._door = DoorState.CLOSED
        self._calls: dict[int, Direction] = {}    # hall calls: floor -> requested direction
        self._destinations: set[int] = set()      # car calls: where a boarded rider is headed
        self._boarding: int | None = None         # floor where a rider just got on
        self._scheduler = scheduler
        self._driving = False
        self._lock = threading.Lock()

    def request_pickup(self, floor: int, direction: Direction):
        """A hall call: someone waiting at `floor`, wanting to go `direction`."""
        with self._lock:
            self._calls[floor] = direction
            self._scheduler.add(floor)
            self._wake()

    def select_destination(self, floor: int):
        """A car call: a boarded rider's actual destination."""
        with self._lock:
            self._destinations.add(floor)
            self._scheduler.add(floor)
            self._boarding = None
            self._wake()

    def _wake(self):
        """Starts the car ticking on its own if it isn't already -- the only
        thing a request does to make the car move."""
        if self._driving:
            return
        self._driving = True
        threading.Timer(TICK_MS / 1000, self._tick).start()

    def _tick(self):
        with self._lock:
            print(self._step())
            waiting_on_rider = self._boarding is not None
            settled = (self._dir is Direction.IDLE and self._door is DoorState.CLOSED
                       and not self._calls and not self._destinations)
            if waiting_on_rider or settled:
                self._driving = False
                return
        threading.Timer(TICK_MS / 1000, self._tick).start()

    def _step(self) -> str:
        """One atomic action: move a floor, open/close a door, or go idle."""
        if self._boarding is not None:
            return f"floor {self._floor}: boarding, awaiting destination"
        if self._door is DoorState.OPEN:                  # open last tick
            self._door = DoorState.CLOSED
            return f"floor {self._floor}: doors closed"

        hall_dir = self._calls.get(self._floor)
        hall_matches = hall_dir is not None and (self._dir is Direction.IDLE or hall_dir is self._dir)
        dest_here = self._floor in self._destinations

        if hall_matches or dest_here:
            if hall_matches:
                del self._calls[self._floor]
                self._scheduler.remove(self._floor)
                self._boarding = self._floor
            if dest_here:
                self._destinations.discard(self._floor)
                self._scheduler.remove(self._floor)
            self._door = DoorState.OPEN
            return f"floor {self._floor}: doors OPEN, {'boarding' if hall_matches else 'dropped off'}"
        # a mismatched hall call (wants DOWN while we're headed UP, say) is
        # simply left pending -- it'll match once the car reverses

        target = self._scheduler.next(self._floor, self._dir)
        if target is None:
            self._dir = Direction.IDLE
            return f"floor {self._floor}: idle"

        next_dir = Direction.UP if target > self._floor else Direction.DOWN
        if next_dir is not self._dir and self._dir is not Direction.IDLE:
            # Reversing: settle the new direction but don't move yet, so the
            # next tick re-checks hall_matches against it -- otherwise the
            # car can sail straight past a floor it should've stopped at.
            self._dir = next_dir
            return f"floor {self._floor}: reversing to {next_dir.value}"
        self._dir = next_dir
        self._floor += 1 if self._dir is Direction.UP else -1
        return f"reached floor {self._floor}"