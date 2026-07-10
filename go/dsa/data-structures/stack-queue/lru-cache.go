type LRUCache struct {
    capacity int
    cache    map[int]*Node
    head, tail *Node
}

func Constructor(capacity int) LRUCache {
    head, tail := &Node{}, &Node{}
    head.next = tail // @viz: init_links_next
    tail.prev = head // @viz: init_links_prev
    return LRUCache{
        capacity: capacity, // @viz: init_system
        cache:   make(map[int]*Node), // @viz: init_system
        head:     head, // @viz: init_head
        tail:     tail, // @viz: init_tail
    }
}

func (this *LRUCache) Get(key int) int { // @viz: get_start
    if node, ok := this.cache[key]; ok { // @viz: get_check
        // @viz: get_node
        this.remove(node) // @viz: get_remove_call
        this.add(node)    // @viz: get_add_call
        return node.value // @viz: get_finish
    }
    return -1 // @viz: get_check
}

func (this *LRUCache) Put(key int, value int) { // @viz: put_start
    if node, ok := this.cache[key]; ok { // @viz: put_check
        this.remove(node) // @viz: put_remove_existing
    }
    if len(this.cache) == this.capacity { // @viz: put_full
        lru := this.tail.prev // @viz: put_get_lru
        this.remove(lru)      // @viz: put_remove_lru_call
        delete(this.cache, lru.key) // @viz: put_delete_map
    }
    newNode := &Node{key: key, value: value} // @viz: put_create
    this.add(newNode) // @viz: put_add_call
    this.cache[key] = newNode // @viz: put_set_map
}

func (this *LRUCache) remove(node *Node) { // @viz: remove_start
    p := node.prev // @viz: remove_p
    n := node.next // @viz: remove_n
    p.next = n // @viz: remove_link_p
    n.prev = p // @viz: remove_link_n
}

func (this *LRUCache) add(node *Node) { // @viz: add_start
    n := this.head.next // @viz: add_n
    this.head.next = node // @viz: add_link_h
    node.prev = this.head // @viz: add_link_p
    node.next = n // @viz: add_link_n
    n.prev = node // @viz: add_link_ln
}