from enum import Enum, auto


class CopyStatus(Enum):
    AVAILABLE = auto()
    LOANED = auto()
    RESERVED = auto()