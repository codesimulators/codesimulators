class MyHashMap {
private:
    struct Node { int key, value; };
    vector<list<Node>> buckets;
    int size = 8;

    int hash(int key) { return key % size; }

public:
    MyHashMap() { // @viz:init
        buckets.resize(size);
    }

    void put(int key, int value) { // @viz:put_start
        int idx = hash(key); // @viz:hash
        auto& bucket = buckets[idx]; // @viz:put_bucket
        for (auto& node : bucket) { // @viz:check_exists
            if (node.key == key) { // @viz:check_key
                node.value = value; // @viz:update
                return; // @viz:put_return
            }
        }
        bucket.push_back({key, value}); // @viz:insert
    }

    int get(int key) { // @viz:get_start
        int idx = hash(key); // @viz:get_hash
        auto& bucket = buckets[idx]; // @viz:get_bucket
        for (auto& node : bucket) { // @viz:get_search
            if (node.key == key) return node.value; // @viz:get_found
        }
        return -1; // @viz:get_not_found
    }

    void remove(int key) { // @viz:remove_start
        int idx = hash(key); // @viz:remove_hash
        auto& bucket = buckets[idx]; // @viz:remove_bucket
        for (auto it = bucket.begin(); it != bucket.end(); ++it) { // @viz:remove_search
            if (it->key == key) { // @viz:remove_check_key
                bucket.erase(it); // @viz:remove_done
                return; // @viz:remove_return
            }
        }
        // Not found // @viz:remove_not_found
    }
}; // @viz:finish