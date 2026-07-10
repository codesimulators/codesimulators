import time
from client_state import ClientState
from rate_limit_strategy import RateLimitResult, RateLimitStrategy


class TokenBucketStrategy(RateLimitStrategy):
    """Tokens refill continuously up to a cap; a request consumes one if
    available. Bursts are bounded by the cap, not by a hard window edge."""

    def __init__(self, capacity: int, refill_per_ms: float):
        self._capacity = capacity
        self._refill_per_ms = refill_per_ms

    def initial_state(self) -> ClientState:
        state = ClientState()
        state.tokens = self._capacity
        state.last_refill = time.time() * 1000
        return state

    def try_consume(self, state: ClientState, now: float) -> RateLimitResult:
        elapsed = max(0.0, now - state.last_refill)  # clamp — clock can't go backward
        state.tokens = min(self._capacity, state.tokens + elapsed * self._refill_per_ms)
        state.last_refill = now

        if state.tokens < 1:
            retry_after_ms = (1 - state.tokens) / self._refill_per_ms
            return RateLimitResult(False, retry_after_ms)
        state.tokens -= 1
        return RateLimitResult(True)