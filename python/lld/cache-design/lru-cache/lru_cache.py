from node import Node


class LRUCache:
    """HashMap for O(1) lookup + a doubly linked list (via sentinel
    head/tail) for O(1) recency tracking. Neither structure alone solves
    this problem."""

    def __init__(self, capacity: int):
        self._capacity = capacity
        self._index = {}
        self._head = Node(None, None)   # sentinel
        self._tail = Node(None, None)   # sentinel
        self._head.next = self._tail
        self._tail.prev = self._head

    def get(self, key):
        node = self._index.get(key)
        if node is None:
            return None
        self._move_to_front(node)
        return node.value

    def put(self, key, value) -> None:
        existing = self._index.get(key)
        if existing is not None:
            existing.value = value
            self._move_to_front(existing)
            return

        node = Node(key, value)
        self._index[key] = node
        self._add_to_front(node)

        if len(self._index) > self._capacity:
            lru = self._tail.prev              # sentinel-adjacent = truly least recent
            self._unlink(lru)
            del self._index[lru.key]

    def _move_to_front(self, node) -> None:
        self._unlink(node)
        self._add_to_front(node)

    def _add_to_front(self, node) -> None:
        node.prev = self._head
        node.next = self._head.next
        self._head.next.prev = node
        self._head.next = node

    def _unlink(self, node) -> None:
        node.prev.next = node.next
        node.next.prev = node.prev