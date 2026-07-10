class Sweeper:
    """Proactively reclaims expired keys — but re-checks each key's LIVE
    expiry before deleting, so a key renewed after being scheduled
    survives its stale heap entry firing."""

    def __init__(self, store):
        self._store = store

    def tick(self, now: float) -> None:
        while True:
            next_item = self._store.expiry_queue.peek()
            if next_item is None or next_item[0] > now:
                break
            self._store.expiry_queue.pop()
            expires_at, key = next_item

            live = self._store.peek_live(key)
            if live is not None and live.expires_at <= now:
                self._store.force_delete(key)   # still actually expired
            # else: key was renewed with a later TTL after this entry was scheduled — skip