class LRUCache {
    int capacity;
    unordered_map<int, Node*> cache;
    Node *head, *tail;

public:
    LRUCache(int capacity) {
        this->capacity = capacity; // @viz: init_system
        cache = {}; // @viz: init_system
        head = new Node(0, 0); // @viz: init_head
        tail = new Node(0, 0); // @viz: init_tail
        head->next = tail; // @viz: init_links_next
        tail->prev = head; // @viz: init_links_prev
    }

    int get(int key) { // @viz: get_start
        if (cache.find(key) == cache.end()) return -1; // @viz: get_check
        Node* node = cache[key]; // @viz: get_node
        remove(node); // @viz: get_remove_call
        add(node); // @viz: get_add_call
        return node->value; // @viz: get_finish
    }

    void put(int key, int value) { // @viz: put_start
        if (cache.count(key)) { // @viz: put_check
            remove(cache[key]); // @viz: put_remove_existing
        }
        if (cache.size() == capacity) { // @viz: put_full
            Node* lru = tail->prev; // @viz: put_get_lru
            remove(lru); // @viz: put_remove_lru_call
            cache.erase(lru->key); // @viz: put_delete_map
        }
        Node* newNode = new Node(key, value); // @viz: put_create
        add(newNode); // @viz: put_add_call
        cache[key] = newNode; // @viz: put_set_map
    }

private:
    void remove(Node* node) { // @viz: remove_start
        Node* p = node->prev; // @viz: remove_p
        Node* n = node->next; // @viz: remove_n
        p->next = n; // @viz: remove_link_p
        n->prev = p; // @viz: remove_link_n
    }

    void add(Node* node) { // @viz: add_start
        Node* n = head->next; // @viz: add_n
        head->next = node; // @viz: add_link_h
        node->prev = head; // @viz: add_link_p
        node->next = n; // @viz: add_link_n
        n->prev = node; // @viz: add_link_ln
    }
};