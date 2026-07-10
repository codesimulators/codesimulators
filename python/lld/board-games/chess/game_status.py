from enum import Enum, auto


class GameStatus(Enum):
    NOT_STARTED = auto()
    IN_PROGRESS = auto()
    COMPLETED = auto()
    DRAW = auto()