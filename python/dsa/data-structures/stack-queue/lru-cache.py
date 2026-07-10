class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity # @viz: init_system
        self.cache = {} # @viz: init_system
        self.head = Node(0, 0) # @viz: init_head
        self.tail = Node(0, 0) # @viz: init_tail
        self.head.next = self.tail # @viz: init_links_next
        self.tail.prev = self.head # @viz: init_links_prev

    def get(self, key: int) -> int: # @viz: get_start
        if key not in self.cache: return -1 # @viz: get_check
        node = self.cache[key] # @viz: get_node
        self._remove(node) # @viz: get_remove_call
        self._add(node) # @viz: get_add_call
        return node.value # @viz: get_finish

    def put(self, key: int, value: int) -> None: # @viz: put_start
        if key in self.cache: # @viz: put_check
            self._remove(self.cache[key]) # @viz: put_remove_existing
        if len(self.cache) == self.capacity: # @viz: put_full
            lru = self.tail.prev # @viz: put_get_lru
            self._remove(lru) # @viz: put_remove_lru_call
            del self.cache[lru.key] # @viz: put_delete_map
        new_node = Node(key, value) # @viz: put_create
        self._add(new_node) # @viz: put_add_call
        self.cache[key] = new_node # @viz: put_set_map

    def _remove(self, node): # @viz: remove_start
        p, n = node.prev, node.next # @viz: remove_p
        # @viz: remove_n
        p.next = n # @viz: remove_link_p
        n.prev = p # @viz: remove_link_n

    def _add(self, node): # @viz: add_start
        n = self.head.next # @viz: add_n
        self.head.next = node # @viz: add_link_h
        node.prev = self.head # @viz: add_link_p
        node.next = n # @viz: add_link_n
        n.prev = node # @viz: add_link_ln