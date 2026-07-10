class LFUCache {
    int capacity, size, minFreq;
    Map<Integer, Node> cache;
    Map<Integer, DLL> freqMap;

    public LFUCache(int capacity) {
        this.capacity = capacity; // @viz: init_system
        this.size = 0; // @viz: init_system
        this.minFreq = 0; // @viz: init_system
        this.cache = new HashMap<>(); // @viz: init_system
        this.freqMap = new HashMap<>(); // @viz: init_system
    }

    public int get(int key) { // @viz: get_start
        if (!cache.containsKey(key)) return -1; // @viz: get_check
        Node node = cache.get(key); // @viz: get_node
        update(node); // @viz: get_update_call
        return node.value; // @viz: get_finish
    }

    public void put(int key, int value) { // @viz: put_start
        if (capacity == 0) return; // @viz: put_cap_check
        if (cache.containsKey(key)) { // @viz: put_check_exists
            Node node = cache.get(key); // @viz: put_get_node
            node.value = value; // @viz: put_update_val
            update(node); // @viz: put_update_existing_call
        } else {
            if (size == capacity) { // @viz: put_full
                DLL list = freqMap.get(minFreq); // @viz: put_lru_list
                Node lru = list.tail.prev; // @viz: put_lru_node
                remove(lru); // @viz: put_evict_remove_call
                cache.remove(lru.key); // @viz: put_evict_map
                size--; // @viz: put_size_dec
            }
            Node newNode = new Node(key, value); // @viz: put_create
            cache.put(key, newNode); // @viz: put_set_map
            size++; // @viz: put_size_inc
            minFreq = 1; // @viz: put_reset_min
            add(newNode, 1); // @viz: put_add_call
        }
    }

    private void update(Node node) { // @viz: update_start
        int freq = node.freq; // @viz: update_get_freq
        remove(node); // @viz: update_remove_call
        if (freq == minFreq && freqMap.get(freq).isEmpty()) { // @viz: update_min_check
            minFreq++; // @viz: update_min_inc
        }
        node.freq++; // @viz: update_freq_inc
        add(node, node.freq); // @viz: update_add_call
    }

    private void remove(Node node) { // @viz: remove_start
        Node p = node.prev; // @viz: remove_p
        Node n = node.next; // @viz: remove_n
        p.next = n; // @viz: remove_link_p
        n.prev = p; // @viz: remove_link_n
    }

    private void add(Node node, int freq) { // @viz: add_start
        DLL list = freqMap.computeIfAbsent(freq, k -> new DLL()); // @viz: add_ensure_list @viz: add_get_list
        Node head = list.head; // @viz: add_get_head
        Node n = head.next; // @viz: add_n
        head.next = node; // @viz: add_link_h
        node.prev = head; // @viz: add_link_p
        node.next = n; // @viz: add_link_n
        n.prev = node; // @viz: add_link_ln
    }
}