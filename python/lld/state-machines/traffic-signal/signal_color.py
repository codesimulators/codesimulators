from enum import Enum


# The three states of a single light. That's the whole state space.
class SignalColor(Enum):
    RED = "RED"
    GREEN = "GREEN"
    YELLOW = "YELLOW"