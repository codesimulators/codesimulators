from signal_color import SignalColor
from transition_table import TRANSITIONS


class TrafficLight:
    """One light = current colour + how long it has held."""

    def __init__(self, start: SignalColor = SignalColor.RED):
        self._color = start
        self._elapsed = 0

    @property
    def color(self) -> SignalColor:
        return self._color

    def tick(self, dt: int):
        """Advance by dt seconds; return the NEW colour if it transitioned."""
        self._elapsed += dt
        phase = TRANSITIONS[self._color]
        if self._elapsed < phase.hold_sec:      # guard: hold time not met
            return None
        self._color = phase.next                # table-driven transition
        self._elapsed = 0
        return self._color

    def force_to(self, color: SignalColor):
        self._color = color
        self._elapsed = 0