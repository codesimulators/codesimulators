type LFUCache struct {
    capacity, size, minFreq int
    cache   map[int]*Node
    freqMap map[int]*DLL
}

func Constructor(capacity int) LFUCache {
    return LFUCache{
        capacity: capacity, // @viz: init_system
        size:     0,        // @viz: init_system
        minFreq:  0,        // @viz: init_system
        cache:   make(map[int]*Node), // @viz: init_system
        freqMap: make(map[int]*DLL),  // @viz: init_system
    }
}

func (this *LFUCache) Get(key int) int { // @viz: get_start
    node, ok := this.cache[key] // @viz: get_check
    if !ok { return -1 } // @viz: get_check
    // @viz: get_node
    this.update(node) // @viz: get_update_call
    return node.value // @viz: get_finish
}

func (this *LFUCache) Put(key int, value int) { // @viz: put_start
    if this.capacity == 0 { return } // @viz: put_cap_check
    if node, ok := this.cache[key]; ok { // @viz: put_check_exists
        // @viz: put_get_node
        node.value = value // @viz: put_update_val
        this.update(node) // @viz: put_update_existing_call
    } else {
        if this.size == this.capacity { // @viz: put_full
            list := this.freqMap[this.minFreq] // @viz: put_lru_list
            lru := list.tail.prev // @viz: put_lru_node
            this.remove(lru) // @viz: put_evict_remove_call
            delete(this.cache, lru.key) // @viz: put_evict_map
            this.size-- // @viz: put_size_dec
        }
        newNode := &Node{key: key, value: value, freq: 1} // @viz: put_create
        this.cache[key] = newNode // @viz: put_set_map
        this.size++ // @viz: put_size_inc
        this.minFreq = 1 // @viz: put_reset_min
        this.add(newNode, 1) // @viz: put_add_call
    }
}

func (this *LFUCache) update(node *Node) { // @viz: update_start
    oldFreq := node.freq // @viz: update_get_freq
    this.remove(node) // @viz: update_remove_call
    if oldFreq == this.minFreq && this.freqMap[oldFreq].isEmpty() { // @viz: update_min_check
        this.minFreq++ // @viz: update_min_inc
    }
    node.freq++ // @viz: update_freq_inc
    this.add(node, node.freq) // @viz: update_add_call
}

func (this *LFUCache) remove(node *Node) { // @viz: remove_start
    p := node.prev // @viz: remove_p
    n := node.next // @viz: remove_n
    p.next = n // @viz: remove_link_p
    n.prev = p // @viz: remove_link_n
}

func (this *LFUCache) add(node *Node, freq int) { // @viz: add_start
    if _, ok := this.freqMap[freq]; !ok { // @viz: add_ensure_list
        this.freqMap[freq] = NewDLL() // @viz: add_ensure_list
    }
    list := this.freqMap[freq] // @viz: add_get_list
    head := list.head // @viz: add_get_head
    n := head.next // @viz: add_n
    head.next = node // @viz: add_link_h
    node.prev = head // @viz: add_link_p
    node.next = n // @viz: add_link_n
    n.prev = node // @viz: add_link_ln
}