from signal_color import SignalColor
from traffic_light import TrafficLight


class IntersectionController:
    """Two lights, one invariant: NS and EW are never flowing at once."""

    def __init__(self):
        self._ns = TrafficLight(SignalColor.GREEN)
        self._ew = TrafficLight(SignalColor.RED)

    @staticmethod
    def _go(c: SignalColor) -> bool:
        return c is not SignalColor.RED

    def _safe(self) -> bool:
        return not (self._go(self._ns.color) and self._go(self._ew.color))

    def tick(self, dt: int):
        ns_go = self._go(self._ns.color)
        live = self._ns if ns_go else self._ew
        idle = self._ew if ns_go else self._ns

        changed = live.tick(dt)
        if changed is SignalColor.RED:
            idle.force_to(SignalColor.GREEN)
        if not self._safe():
            raise RuntimeError("INVARIANT VIOLATED: both axes flowing")

    def state(self) -> str:
        return f"NS={self._ns.color.value}  EW={self._ew.color.value}"