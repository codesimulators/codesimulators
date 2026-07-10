class LFUCache {
    int capacity, size, minFreq;
    unordered_map<int, Node*> cache;
    unordered_map<int, DLL*> freqMap;

public:
    LFUCache(int capacity) {
        this->capacity = capacity; // @viz: init_system
        this->size = 0; // @viz: init_system
        this->minFreq = 0; // @viz: init_system
        this->cache = {}; // @viz: init_system
        this->freqMap = {}; // @viz: init_system
    }

    int get(int key) { // @viz: get_start
        if (cache.find(key) == cache.end()) return -1; // @viz: get_check
        Node* node = cache[key]; // @viz: get_node
        update(node); // @viz: get_update_call
        return node->value; // @viz: get_finish
    }

    void put(int key, int value) { // @viz: put_start
        if (capacity == 0) return; // @viz: put_cap_check
        if (cache.count(key)) { // @viz: put_check_exists
            Node* node = cache[key]; // @viz: put_get_node
            node->value = value; // @viz: put_update_val
            update(node); // @viz: put_update_existing_call
        } else {
            if (size == capacity) { // @viz: put_full
                DLL* list = freqMap[minFreq]; // @viz: put_lru_list
                Node* lru = list->tail->prev; // @viz: put_lru_node
                remove(lru); // @viz: put_evict_remove_call
                cache.erase(lru->key); // @viz: put_evict_map
                size--; // @viz: put_size_dec
            }
            Node* newNode = new Node(key, value); // @viz: put_create
            cache[key] = newNode; // @viz: put_set_map
            size++; // @viz: put_size_inc
            minFreq = 1; // @viz: put_reset_min
            add(newNode, 1); // @viz: put_add_call
        }
    }

private:
    void update(Node* node) { // @viz: update_start
        int freq = node->freq; // @viz: update_get_freq
        remove(node); // @viz: update_remove_call
        if (freq == minFreq && freqMap[freq]->isEmpty()) { // @viz: update_min_check
            minFreq++; // @viz: update_min_inc
        }
        node->freq++; // @viz: update_freq_inc
        add(node, node->freq); // @viz: update_add_call
    }

    void remove(Node* node) { // @viz: remove_start
        Node* p = node->prev; // @viz: remove_p
        Node* n = node->next; // @viz: remove_n
        p->next = n; // @viz: remove_link_p
        n->prev = p; // @viz: remove_link_n
    }

    void add(Node* node, int freq) { // @viz: add_start
        if (!freqMap.count(freq)) freqMap[freq] = new DLL(); // @viz: add_ensure_list
        DLL* list = freqMap[freq]; // @viz: add_get_list
        Node* head = list->head; // @viz: add_get_head
        Node* n = head->next; // @viz: add_n
        head->next = node; // @viz: add_link_h
        node->prev = head; // @viz: add_link_p
        node->next = n; // @viz: add_link_n
        n->prev = node; // @viz: add_link_ln
    }
};