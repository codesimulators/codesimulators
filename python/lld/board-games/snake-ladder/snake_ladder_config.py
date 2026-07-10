from dataclasses import dataclass, field
from typing import Dict


# The board layout — the ONLY thing that changes between a 10x10 board,
# a mini test board, or a completely different race game (see main.py).
@dataclass
class SnakeLadderConfig:
    finish: int
    snakes: Dict[int, int] = field(default_factory=dict)   # head -> tail
    ladders: Dict[int, int] = field(default_factory=dict)  # bottom -> top


DEFAULT_CONFIG = SnakeLadderConfig(
    finish=100,
    snakes={16: 6, 46: 25, 49: 11, 62: 19, 64: 60, 74: 53, 89: 68, 92: 88, 95: 75, 99: 80},
    ladders={2: 38, 7: 14, 8: 31, 15: 26, 21: 42, 28: 84, 36: 44, 51: 67, 71: 91, 78: 98, 87: 94},
)