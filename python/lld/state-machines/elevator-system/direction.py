from enum import Enum


# The elevator's tiny state space.
class Direction(Enum):
    UP = "UP"
    DOWN = "DOWN"
    IDLE = "IDLE"


class DoorState(Enum):
    OPEN = "OPEN"
    CLOSED = "CLOSED"