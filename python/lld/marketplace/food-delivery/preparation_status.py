from enum import Enum


class PreparationStatus(Enum):
    RECEIVED = "RECEIVED"
    PREPARING = "PREPARING"
    READY = "READY"
    CANCELLED = "CANCELLED"