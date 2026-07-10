import java.util.HashMap;
import java.util.Map;

// HashMap for O(1) lookup + a doubly linked list (via sentinel head/tail)
// for O(1) recency tracking. Neither structure alone solves this problem.
public class LRUCache<K, V> {
    private final Map<K, Node<K, V>> index = new HashMap<>();
    private final Node<K, V> head = new Node<>(null, null);   // sentinel
    private final Node<K, V> tail = new Node<>(null, null);   // sentinel
    private final int capacity;

    public LRUCache(int capacity) {
        this.capacity = capacity;
        head.next = tail;
        tail.prev = head;
    }

    public V get(K key) {
        Node<K, V> node = index.get(key);
        if (node == null) return null;
        moveToFront(node);
        return node.value;
    }

    public void put(K key, V value) {
        Node<K, V> existing = index.get(key);
        if (existing != null) {
            existing.value = value;
            moveToFront(existing);
            return;
        }
        Node<K, V> node = new Node<>(key, value);
        index.put(key, node);
        addToFront(node);

        if (index.size() > capacity) {
            Node<K, V> lru = tail.prev;                 // sentinel-adjacent = truly least recent
            unlink(lru);
            index.remove(lru.key);
        }
    }

    private void moveToFront(Node<K, V> node) { unlink(node); addToFront(node); }

    private void addToFront(Node<K, V> node) {
        node.prev = head;
        node.next = head.next;
        head.next.prev = node;
        head.next = node;
    }

    private void unlink(Node<K, V> node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }
}