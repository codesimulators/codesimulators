class LFUCache {
  constructor(capacity) {
    this.capacity = capacity; // @viz: init_system
    this.size = 0; // @viz: init_system
    this.minFreq = 0; // @viz: init_system
    this.cache = new Map(); // @viz: init_system
    this.freqMap = new Map(); // @viz: init_system
  }

  get(key) { // @viz: get_start
    if (!this.cache.has(key)) return -1; // @viz: get_check
    const node = this.cache.get(key); // @viz: get_node
    this._update(node); // @viz: get_update_call
    return node.value; // @viz: get_finish
  }

  put(key, value) { // @viz: put_start
    if (this.capacity === 0) return; // @viz: put_cap_check
    if (this.cache.has(key)) { // @viz: put_check_exists
      const node = this.cache.get(key); // @viz: put_get_node
      node.value = value; // @viz: put_update_val
      this._update(node); // @viz: put_update_existing_call
    } else {
      if (this.size === this.capacity) { // @viz: put_full
        const list = this.freqMap.get(this.minFreq); // @viz: put_lru_list
        const lru = list.tail.prev; // @viz: put_lru_node
        this._remove(lru); // @viz: put_evict_remove_call
        this.cache.delete(lru.key); // @viz: put_evict_map
        this.size--; // @viz: put_size_dec
      }
      const newNode = new Node(key, value); // @viz: put_create
      this.cache.set(key, newNode); // @viz: put_set_map
      this.size++; // @viz: put_size_inc
      this.minFreq = 1; // @viz: put_reset_min
      this._add(newNode, 1); // @viz: put_add_call
    }
  }

  _update(node) { // @viz: update_start
    const freq = node.freq; // @viz: update_get_freq
    this._remove(node); // @viz: update_remove_call
    if (freq === this.minFreq && this.freqMap.get(freq).isEmpty()) { // @viz: update_min_check
      this.minFreq++; // @viz: update_min_inc
    }
    node.freq++; // @viz: update_freq_inc
    this._add(node, node.freq); // @viz: update_add_call
  }

  _remove(node) { // @viz: remove_start
    const p = node.prev; // @viz: remove_p
    const n = node.next; // @viz: remove_n
    p.next = n; // @viz: remove_link_p
    n.prev = p; // @viz: remove_link_n
  }

  _add(node, freq) { // @viz: add_start
    if (!this.freqMap.has(freq)) this.freqMap.set(freq, new DLL()); // @viz: add_ensure_list
    const list = this.freqMap.get(freq); // @viz: add_get_list
    const head = list.head; // @viz: add_get_head
    const n = head.next; // @viz: add_n
    head.next = node; // @viz: add_link_h
    node.prev = head; // @viz: add_link_p
    node.next = n; // @viz: add_link_n
    n.prev = node; // @viz: add_link_ln
  }
}