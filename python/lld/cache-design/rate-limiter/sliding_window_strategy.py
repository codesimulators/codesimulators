from client_state import ClientState
from rate_limit_strategy import RateLimitResult, RateLimitStrategy


class SlidingWindowStrategy(RateLimitStrategy):
    """Keeps an exact timestamp log of requests in the trailing window —
    no boundary effect, at the cost of memory proportional to traffic."""

    def __init__(self, limit: int, window_ms: float):
        self._limit = limit
        self._window_ms = window_ms

    def initial_state(self) -> ClientState:
        return ClientState()

    def try_consume(self, state: ClientState, now: float) -> RateLimitResult:
        while state.request_log and now - state.request_log[0] > self._window_ms:
            state.request_log.popleft()  # drop entries outside the window

        if len(state.request_log) >= self._limit:
            retry_after_ms = self._window_ms - (now - state.request_log[0])
            return RateLimitResult(False, retry_after_ms)
        state.request_log.append(now)
        return RateLimitResult(True)