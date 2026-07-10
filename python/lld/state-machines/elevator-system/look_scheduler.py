import bisect

from direction import Direction


class LookScheduler:
    """The SCHEDULING POLICY, isolated from the car (LOOK algorithm). It only
    ever sees floor numbers -- not which are pickups, drop-offs, or which way
    a hall call wants to go; that distinction lives entirely in Elevator."""

    def __init__(self):
        self._targets: list[int] = []   # kept sorted -- bisect finds neighbors in O(log n)

    def add(self, floor: int):
        i = bisect.bisect_left(self._targets, floor)
        if i == len(self._targets) or self._targets[i] != floor:
            self._targets.insert(i, floor)

    def remove(self, floor: int):
        i = bisect.bisect_left(self._targets, floor)
        if i < len(self._targets) and self._targets[i] == floor:
            self._targets.pop(i)

    def has_work(self) -> bool:
        return bool(self._targets)

    def next(self, current: int, direction: Direction):
        i = bisect.bisect_left(self._targets, current)
        below = self._targets[i - 1] if i > 0 else None                 # largest strictly < current
        above_i = i + 1 if i < len(self._targets) and self._targets[i] == current else i
        above = self._targets[above_i] if above_i < len(self._targets) else None  # smallest strictly > current
        if direction is Direction.DOWN:
            return below if below is not None else above
        return above if above is not None else below   # UP or IDLE: prefer continuing upward