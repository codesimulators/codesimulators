import time
from entry import Entry
from expiry_queue import ExpiryQueue


class StaleWrite(Exception):
    pass


class KVStore:
    """The map + operations. The lazy check on get() backstops the
    proactive Sweeper — a key is never returned past its expiry,
    whichever runs first."""

    def __init__(self):
        self._entries = {}
        self.expiry_queue = ExpiryQueue()

    def set(self, key: str, value, ttl_ms: float) -> None:
        expires_at = time.time() * 1000 + ttl_ms
        prev_version = self._entries[key].version if key in self._entries else 0
        self._entries[key] = Entry(value, expires_at, prev_version + 1)
        self.expiry_queue.schedule(key, expires_at)

    def get(self, key: str):
        entry = self._entries.get(key)
        if entry is None:
            return None
        if time.time() * 1000 > entry.expires_at:   # lazy check
            del self._entries[key]
            return None
        return entry.value

    def delete(self, key: str) -> None:
        self._entries.pop(key, None)

    def compare_and_set(self, key: str, expected_version: int, value, ttl_ms: float) -> None:
        current = self._entries.get(key)
        current_version = current.version if current else 0
        if current_version != expected_version:
            raise StaleWrite()
        self.set(key, value, ttl_ms)

    def peek_live(self, key: str):
        return self._entries.get(key)

    def force_delete(self, key: str) -> None:
        self._entries.pop(key, None)