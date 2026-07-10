import heapq


class ExpiryQueue:
    """A min-heap keyed by expiry time. The sweeper only ever looks at
    the earliest entry — it never scans keys that aren't due yet."""

    def __init__(self):
        self._heap = []

    def schedule(self, key: str, expires_at: float) -> None:
        heapq.heappush(self._heap, (expires_at, key))

    def peek(self):
        return self._heap[0] if self._heap else None

    def pop(self):
        return heapq.heappop(self._heap) if self._heap else None