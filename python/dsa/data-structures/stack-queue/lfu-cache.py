class LFUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity # @viz: init_system
        self.size = 0 # @viz: init_system
        self.min_freq = 0 # @viz: init_system
        self.cache = {} # @viz: init_system
        self.freq_map = collections.defaultdict(DoublyLinkedList) # @viz: init_system

    def get(self, key: int) -> int: # @viz: get_start
        if key not in self.cache: return -1 # @viz: get_check
        node = self.cache[key] # @viz: get_node
        self._update(node) # @viz: get_update_call
        return node.value # @viz: get_finish

    def put(self, key: int, value: int) -> None: # @viz: put_start
        if self.capacity == 0: return # @viz: put_cap_check
        if key in self.cache: # @viz: put_check_exists
            node = self.cache[key] # @viz: put_get_node
            node.value = value # @viz: put_update_val
            self._update(node) # @viz: put_update_existing_call
        else:
            if self.size == self.capacity: # @viz: put_full
                lru_list = self.freq_map[self.min_freq] # @viz: put_lru_list
                lru_node = lru_list.tail.prev # @viz: put_lru_node
                self._remove(lru_node) # @viz: put_evict_remove_call
                del self.cache[lru_node.key] # @viz: put_evict_map
                self.size -= 1 # @viz: put_size_dec
            new_node = Node(key, value) # @viz: put_create
            self.cache[key] = new_node # @viz: put_set_map
            self.size += 1 # @viz: put_size_inc
            self.min_freq = 1 # @viz: put_reset_min
            self._add(new_node, 1) # @viz: put_add_call

    def _update(self, node): # @viz: update_start
        freq = node.freq # @viz: update_get_freq
        self._remove(node) # @viz: update_remove_call
        if freq == self.min_freq and self.freq_map[freq].is_empty(): # @viz: update_min_check
            self.min_freq += 1 # @viz: update_min_inc
        node.freq += 1 # @viz: update_freq_inc
        self._add(node, node.freq) # @viz: update_add_call

    def _remove(self, node): # @viz: remove_start
        p, n = node.prev, node.next # @viz: remove_p
        # @viz: remove_n
        p.next = n # @viz: remove_link_p
        n.prev = p # @viz: remove_link_n

    def _add(self, node, freq): # @viz: add_start
        list = self.freq_map[freq] # @viz: add_ensure_list @viz: add_get_list
        head = list.head # @viz: add_get_head
        n = head.next # @viz: add_n
        head.next = node # @viz: add_link_h
        node.prev = head # @viz: add_link_p
        node.next = n # @viz: add_link_n
        n.prev = node # @viz: add_link_ln