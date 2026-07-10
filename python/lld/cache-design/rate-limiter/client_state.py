from collections import deque


class ClientState:
    """One client's throttling state. Shape depends on the strategy in
    use — a token bucket needs tokens+last_refill; a sliding window needs
    a log."""

    def __init__(self):
        self.tokens = 0.0
        self.last_refill = 0.0
        self.request_log = deque()