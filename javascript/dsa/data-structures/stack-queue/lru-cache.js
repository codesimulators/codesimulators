class LRUCache {
  constructor(capacity) {
    this.capacity = capacity; // @viz: init_system
    this.cache = new Map(); // @viz: init_system
    this.head = new Node(0, 0); // @viz: init_head
    this.tail = new Node(0, 0); // @viz: init_tail
    this.head.next = this.tail; // @viz: init_links_next
    this.tail.prev = this.head; // @viz: init_links_prev
  }

  get(key) { // @viz: get_start
    if (!this.cache.has(key)) return -1; // @viz: get_check
    const node = this.cache.get(key); // @viz: get_node
    this._remove(node); // @viz: get_remove_call
    this._add(node); // @viz: get_add_call
    return node.value; // @viz: get_finish
  }

  put(key, value) { // @viz: put_start
    if (this.cache.has(key)) { // @viz: put_check
      this._remove(this.cache.get(key)); // @viz: put_remove_existing
    }
    if (this.cache.size === this.capacity) { // @viz: put_full
      const lru = this.tail.prev; // @viz: put_get_lru
      this._remove(lru); // @viz: put_remove_lru_call
      this.cache.delete(lru.key); // @viz: put_delete_map
    }
    const newNode = new Node(key, value); // @viz: put_create
    this._add(newNode); // @viz: put_add_call
    this.cache.set(key, newNode); // @viz: put_set_map
  }

  _remove(node) { // @viz: remove_start
    const p = node.prev; // @viz: remove_p
    const n = node.next; // @viz: remove_n
    p.next = n; // @viz: remove_link_p
    n.prev = p; // @viz: remove_link_n
  }

  _add(node) { // @viz: add_start
    const n = this.head.next; // @viz: add_n
    this.head.next = node; // @viz: add_link_h
    node.prev = this.head; // @viz: add_link_p
    node.next = n; // @viz: add_link_n
    n.prev = node; // @viz: add_link_ln
  }
}