from rate_limit_strategy import RateLimitStrategy


class RateLimiter:
    """Context — the only class callers touch. Holds one strategy + a
    per-client state map so unrelated clients are never serialized
    against each other."""

    def __init__(self, strategy: RateLimitStrategy):
        self._strategy = strategy
        self._client_states = {}

    def is_allowed(self, client_id: str, now: float):
        if client_id not in self._client_states:
            self._client_states[client_id] = self._strategy.initial_state()  # starts FULL
        state = self._client_states[client_id]
        # real code: acquire a per-client lock here before mutating state
        return self._strategy.try_consume(state, now)