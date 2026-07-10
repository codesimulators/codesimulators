class MyHashMap {
    private class Node {
        int key, value;
        Node(int key, int value) { this.key = key; this.value = value; }
    }
    private List<Node>[] buckets;
    private int size = 8;

    public MyHashMap() { // @viz:init
        buckets = new LinkedList[size];
        for (int i = 0; i < size; i++) buckets[i] = new LinkedList<>();
    }

    private int hash(int key) { return key % size; }

    public void put(int key, int value) { // @viz:put_start
        int idx = hash(key); // @viz:hash
        // Get bucket // @viz:put_bucket
        for (Node node : buckets[idx]) { // @viz:check_exists
            if (node.key == key) { // @viz:check_key
                node.value = value; // @viz:update
                return; // @viz:put_return
            }
        }
        buckets[idx].add(new Node(key, value)); // @viz:insert
    }

    public int get(int key) { // @viz:get_start
        int idx = hash(key); // @viz:get_hash
        // Get bucket // @viz:get_bucket
        for (Node node : buckets[idx]) { // @viz:get_search
            if (node.key == key) return node.value; // @viz:get_found
        }
        return -1; // @viz:get_not_found
    }

    public void remove(int key) { // @viz:remove_start
        int idx = hash(key); // @viz:remove_hash
        // Get bucket // @viz:remove_bucket
        Iterator<Node> it = buckets[idx].iterator();
        while (it.hasNext()) { // @viz:remove_search
            if (it.next().key == key) { // @viz:remove_check_key
                it.remove(); // @viz:remove_done
                return; // @viz:remove_return
            }
        }
        // Not found // @viz:remove_not_found
    }
} // @viz:finish