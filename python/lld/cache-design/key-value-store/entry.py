from dataclasses import dataclass
from typing import Generic, TypeVar

V = TypeVar("V")


@dataclass
class Entry(Generic[V]):
    """An immutable-ish snapshot of one stored value: what it holds, when
    it expires, and a version counter for optimistic-concurrency writes."""
    value: V
    expires_at: float
    version: int