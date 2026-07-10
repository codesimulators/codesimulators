class IdempotencyStore:
    """Caches the result of the FIRST call under a given key. Every retry
    with the same key returns that cached result instead of re-running
    anything."""

    def __init__(self):
        self._results = {}

    def get(self, key: str):
        return self._results.get(key)

    def put(self, key: str, result) -> None:
        self._results[key] = result