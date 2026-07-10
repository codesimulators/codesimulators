from __future__ import annotations
from abc import ABC, abstractmethod
from dataclasses import dataclass


@dataclass
class RateLimitResult:
    allowed: bool
    retry_after_ms: float = 0


class RateLimitStrategy(ABC):
    """Strategy: the swappable throttling algorithm. RateLimiter never
    branches on which one is active — it only ever calls try_consume()."""

    @abstractmethod
    def initial_state(self) -> "ClientState": ...

    @abstractmethod
    def try_consume(self, state: "ClientState", now: float) -> RateLimitResult: ...