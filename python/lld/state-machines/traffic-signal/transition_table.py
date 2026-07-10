from dataclasses import dataclass
from signal_color import SignalColor


# The transition TABLE is the machine's brain: next colour + hold time.
@dataclass(frozen=True)
class Phase:
    next: SignalColor
    hold_sec: int


TRANSITIONS = {
    SignalColor.RED:    Phase(SignalColor.GREEN, 30),
    SignalColor.GREEN:  Phase(SignalColor.YELLOW, 25),
    SignalColor.YELLOW: Phase(SignalColor.RED, 5),
}