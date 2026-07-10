class RetryPolicy:
    """Strategy: how many attempts per provider, and how long to back off
    between them. Independent of any one provider's behaviour."""

    def __init__(self, max_attempts: int = 3, base_backoff_ms: int = 200):
        self.max_attempts = max_attempts
        self._base_backoff_ms = base_backoff_ms

    def backoff_ms(self, attempt: int) -> int:
        return self._base_backoff_ms * (2 ** (attempt - 1))  # 200, 400, 800, ...