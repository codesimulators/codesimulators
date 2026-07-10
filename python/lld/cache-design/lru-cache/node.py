class Node:
    """One entry's position in the recency order. prev/next make this an
    intrusive doubly linked list node — no separate list container needed."""

    def __init__(self, key, value):
        self.key = key
        self.value = value
        self.prev = None
        self.next = None